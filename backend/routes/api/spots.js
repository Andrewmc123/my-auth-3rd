const express = require('express');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User } = require('../../db/models');

const router = express.Router();




const validateSpot = (reqBody) => {
  const errors = {};
  const requiredFields = ["address", "city", "state", "country", "lat", "lng", "name", "description", "price"];

  requiredFields.forEach(field => {
    if (!reqBody[field]) {
      errors[field] = `${field[0].toUpperCase() + field.slice(1)} is required`;
    }
  });

  if (reqBody.lat < -90 || reqBody.lat > 90) errors.lat = "Latitude must be between -90 and 90";
  if (reqBody.lng < -180 || reqBody.lng > 180) errors.lng = "Longitude must be between -180 and 180";
  if (reqBody.name && reqBody.name.length > 50) errors.name = "Name must be less than 50 characters";
  if (reqBody.price && (typeof reqBody.price !== 'number' || reqBody.price < 0)) errors.price = "Price must be a number greater than or equal to 0";

  return errors;
};

const validateImage = (reqBody) => {
  const errors = {};
  if (!reqBody.url) errors.url = "URL is required";
  if (typeof reqBody.preview !== 'boolean') errors.preview = "Preview must be a boolean";
  return errors;
};

const validateQueryParams = (params) => {
  const errors = {};
  const numberFields = ['page', 'size', 'minLat', 'maxLat', 'minLng', 'maxLng', 'minPrice', 'maxPrice'];

  numberFields.forEach(field => {
    if (params[field] !== undefined) {
      const val = parseFloat(params[field]);
      if (isNaN(val)) errors[field] = `${field} must be a number`;
      else params[field] = val;
    }
  });

  if (params.page && params.page < 1) errors.page = "Page must be >= 1";
  if (params.size && (params.size < 1 || params.size > 20)) errors.size = "Size must be between 1 and 20";

  return { errors, params };
};

//routes// 
// GET: All spots with query filters
router.get('/', async (req, res) => {
  const { errors, params } = validateQueryParams(req.query);
  if (Object.keys(errors).length) return res.status(400).json({ message: "Bad Request", errors });

  const {
    page = 1, size = 20,
    minLat = -90, maxLat = 90,
    minLng = -180, maxLng = 180,
    minPrice = 0, maxPrice = Number.MAX_SAFE_INTEGER
  } = params;

  const spots = await Spot.findAll({
    where: {
      lat: { [Op.between]: [minLat, maxLat] },
      lng: { [Op.between]: [minLng, maxLng] },
      price: { [Op.between]: [minPrice, maxPrice] }
    },
    include: [
      { model: SpotImage, attributes: ['url', 'preview'] },
      { model: Review, attributes: ['stars'] }
    ],
    limit: size,
    offset: (page - 1) * size
  });

  const spotsList = spots.map(spot => spot.toJSON());
  return res.json({ Spots: spotsList, page, size });
});

// GET: Spots owned by current user
router.get('/current', requireAuth, async (req, res) => {
  const spots = await Spot.findAll({
    where: { ownerId: req.user.id },
    include: [
      { model: SpotImage, attributes: ['url', 'preview'] },
      { model: Review, attributes: ['stars'] }
    ]
  });

  const spotsList = spots.map(spot => processSpot(spot.toJSON()));
  res.json({ Spots: spotsList });
});

// GET: Spot by ID with details
router.get('/:spotId', async (req, res) => {
  const spot = await Spot.findOne({
    where: { id: req.params.spotId },
    include: [
      { model: User, as: 'Owner', attributes: ['id', 'firstName', 'lastName'] },
      { model: SpotImage, attributes: ['id', 'url', 'preview'] },
      { model: Review, attributes: ['stars'] }
    ]
  });

  if (!spot) return res.status(404).json({ message: "Spot couldn't be found" });

  const data = spot.toJSON();
  data.numReviews = data.Reviews.length;
  data.avgStarRating = data.numReviews ? parseFloat((data.Reviews.reduce((acc, r) => acc + r.stars, 0) / data.numReviews).toFixed(1)) : null;
  delete data.Reviews;

  res.status(200).json(data);
});

// POST: Create a new spot
router.post('/', requireAuth, async (req, res) => {
  const errors = validateSpot(req.body);
  if (Object.keys(errors).length) return res.status(400).json({ message: "Bad Request", errors });

  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const spot = await Spot.create({ ownerId: req.user.id, address, city, state, country, lat, lng, name, description, price });

  if (req.body.previewImage) await SpotImage.create({ spotId: spot.id, url: req.body.previewImage, preview: true });
  if (Array.isArray(req.body.imageUrls)) {
    for (const url of req.body.imageUrls) {
      await SpotImage.create({ spotId: spot.id, url, preview: false });
    }
  }

  res.status(201).json(spot);
});

// POST: Add image to spot
router.post('/:spotId/images', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) return res.status(404).json({ message: "Spot couldn't be found" });
  if (spot.ownerId !== req.user.id) return res.status(403).json({ message: "Forbidden" });

  const errors = validateImage(req.body);
  if (Object.keys(errors).length) return res.status(400).json({ message: "Bad Request", errors });

  const image = await SpotImage.create({ spotId: spot.id, url: req.body.url, preview: req.body.preview });
  res.status(201).json(image);
});

// PUT: Update a spot
router.put('/:spotId', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) return res.status(404).json({ message: "Spot couldn't be found" });
  if (spot.ownerId !== req.user.id) return res.status(403).json({ message: "Forbidden" });

  const errors = validateSpot(req.body);
  if (Object.keys(errors).length) return res.status(400).json({ message: "Bad Request", errors });

  await spot.update(req.body);
  res.status(200).json(spot);
});

// DELETE: Delete a spot
router.delete('/:spotId', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) return res.status(404).json({ message: "Spot couldn't be found" });
  if (spot.ownerId !== req.user.id) return res.status(403).json({ message: "Forbidden" });

  await SpotImage.destroy({ where: { spotId: spot.id } });
  await Review.destroy({ where: { spotId: spot.id } });
  await spot.destroy();

  res.json({ message: "Successfully deleted", statusCode: 200 });
});

module.exports = router;
