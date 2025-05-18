// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const spotsRouter = require('./spots.js'); //
const reviewsRouter = require('./reviews.js') //
const spotImagesRouter = require('./spot-images.js') //
const reviewImagesRouter = require('./review-images.js') //
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/spots', spotsRouter) //
router.use('/reviews', reviewsRouter) //
router.use('/spot-images', spotImagesRouter) //
router.use('/review-images', reviewImagesRouter) //

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
