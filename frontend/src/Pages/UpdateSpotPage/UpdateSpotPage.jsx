import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateSpotThunk, readSpotThunk } from "../../store/spots";
import { createImageThunk, deleteImageThunk } from "../../store/images";

// I believe this is the form used to update a spot
const UpdateSpotForm = () => {

  // I believe this gets the spotId from the URL
  const { spotId } = useParams();

  // This is doing setup for dispatch and navigation
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // I believe this grabs the spot data from the Redux store
  const spot = useSelector((state) => state.spots[spotId]);

  // These are the form fields
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [imageUrl1, setImageUrl1] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [imageUrl3, setImageUrl3] = useState("");
  const [imageUrl4, setImageUrl4] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // This is doing the fetch for spot data on page load
  useEffect(() => {
    if (spotId) {
      dispatch(readSpotThunk(spotId));
    }
  }, [dispatch, spotId]);

  // I believe this fills in the form once spot data is loaded
  useEffect(() => {
    if (spot) {
      setCountry(spot.country);
      setAddress(spot.address);
      setCity(spot.city);
      setState(spot.state);
      setDescription(spot.description);
      setName(spot.name);
      setPrice(spot.price);

      if (spot.SpotImages && spot.SpotImages.length > 0) {
        const preview = spot.SpotImages.find((img) => img.preview === true);
        const nonPreviewImages = spot.SpotImages.filter((img) => img.preview === false);

        setPreviewImage(preview ? preview.url : "");
        setImageUrl1(nonPreviewImages[0] ? nonPreviewImages[0].url : "");
        setImageUrl2(nonPreviewImages[1] ? nonPreviewImages[1].url : "");
        setImageUrl3(nonPreviewImages[2] ? nonPreviewImages[2].url : "");
        setImageUrl4(nonPreviewImages[3] ? nonPreviewImages[3].url : "");
      }
    }
  }, [spot]);

  // I believe this is checking for form validation errors
  useEffect(() => {
    const errors = {};
    if (hasSubmitted) {
      if (!country) errors.country = "Country is required";
      if (!address) errors.address = "Address is required";
      if (!city) errors.city = "City is required";
      if (!state) errors.state = "State is required";
      if (!description || description.length < 30) errors.description = "Description needs a minimum of 30 characters";
      if (!name) errors.name = "Name is required";
      if (!price) errors.price = "Price is required";
      if (!previewImage) errors.previewImage = "Preview image is required";
      if (imageUrl1 && !/\.jpg|\.jpeg|\.png$/i.test(imageUrl1)) errors.imageUrl1 = "Image URL must end in .png .jpg or .jpeg";
      if (imageUrl2 && !/\.jpg|\.jpeg|\.png$/i.test(imageUrl2)) errors.imageUrl2 = "Image URL must end in .png .jpg or .jpeg";
      if (imageUrl3 && !/\.jpg|\.jpeg|\.png$/i.test(imageUrl3)) errors.imageUrl3 = "Image URL must end in .png .jpg or .jpeg";
      if (imageUrl4 && !/\.jpg|\.jpeg|\.png$/i.test(imageUrl4)) errors.imageUrl4 = "Image URL must end in .png .jpg or .jpeg";
      setFormErrors(errors);
    }
  }, [hasSubmitted, country, address, city, state, description, name, price, previewImage, imageUrl1, imageUrl2, imageUrl3, imageUrl4]);

  // This is doing the main form submit logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (Object.keys(formErrors).length > 0) return;

    // I believe this builds the spot data to send
    const spotData = {
      address,
      city,
      state,
      country,
      lat: spot.lat || 0,
      lng: spot.lng || 0,
      name,
      description,
      price,
    };

    // This is doing the spot update
    const updatedSpot = await dispatch(updateSpotThunk(spotId, spotData));

    if (updatedSpot) {
      const existingPreview = spot.SpotImages.find((img) => img.preview === true);
      if (!existingPreview || existingPreview.url !== previewImage) {
        await dispatch(createImageThunk(spotId, { url: previewImage, preview: true }));
      }

      // I believe this removes old non-preview images
      const nonPreviewImages = spot.SpotImages.filter((img) => img.preview === false);
      for (const img of nonPreviewImages) {
        await dispatch(deleteImageThunk(img.id));
      }

      // This is doing the upload for each new image if provided
      if (imageUrl1) await dispatch(createImageThunk(spotId, { url: imageUrl1, preview: false }));
      if (imageUrl2) await dispatch(createImageThunk(spotId, { url: imageUrl2, preview: false }));
      if (imageUrl3) await dispatch(createImageThunk(spotId, { url: imageUrl3, preview: false }));
      if (imageUrl4) await dispatch(createImageThunk(spotId, { url: imageUrl4, preview: false }));

      // This is doing the redirect after updating
      navigate(`/spots/${spotId}`);
    }
  };

  // I believe this is rendering the full update form
  return (
    <div className="update-spot-form-container">
      <h1>Update Your Spot</h1>
      <form onSubmit={handleSubmit} className="long-forms">
        
        {/* I believe this section is for location inputs */}
        <div className="form-section">
          <h2>Where&apos;s your place located?</h2>
          <p>Guests will only get your exact address once they booked a reservation.</p>
          
          {/* Country input */}
          <div className="form-group">
            <label>Country</label>
            <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
            {formErrors.country && <p className="error">{formErrors.country}</p>}
          </div>

          {/* Address input */}
          <div className="form-group">
            <label>Street Address</label>
            <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
            {formErrors.address && <p className="error">{formErrors.address}</p>}
          </div>

          <div className="location">

            {/* City input */}
            <div className="form-group CityState">
              <label>City</label>
              <input className="cityInput" type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
              {formErrors.city && <p className="error">{formErrors.city}</p>}
            </div>

            <div className="CityState"><label></label><br /><br /></div><span></span>

            {/* State input */}
            <div className="form-group CityState">
              <label>State</label>
              <input className="stateInput" type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
              {formErrors.state && <p className="error">{formErrors.state}</p>}
            </div>
          </div>
        </div>

        {/* I believe this section is for the description */}
        <div className="form-section">
          <h2>Describe your place to guests</h2>
          <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
          <div className="form-group">
            <label>Description</label>
            <textarea placeholder="Please write at least 30 characters" value={description} onChange={(e) => setDescription(e.target.value)} />
            {formErrors.description && <p className="error">{formErrors.description}</p>}
          </div>
        </div>

        {/* I believe this section is for the title of the spot */}
        <div className="form-section">
          <h2>Create a title for your spot</h2>
          <p>Catch guests attention with a spot title that highlights what makes your place special.</p>
          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="Name of your spot" value={name} onChange={(e) => setName(e.target.value)} />
            {formErrors.name && <p className="error">{formErrors.name}</p>}
          </div>
        </div>

        {/* This section is for setting the price */}
        <div className="form-section">
          <h2>Set a base price for your spot</h2>
          <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
          <div className="form-group">
            <label>Price per night (USD)</label>
            <div className="price">
              <span>$</span>
              <input type="number" placeholder="Price per night (USD)" value={price} onChange={(e) => setPrice(e.target.value)} />
              {formErrors.price && <p className="error">{formErrors.price}</p>}
            </div>
          </div>
        </div>

        {/* I believe this section is for image links */}
        <div className="form-section">
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot.</p>

          <div className="form-group">
            <input type="text" placeholder="Preview Image URL" value={previewImage} onChange={(e) => setPreviewImage(e.target.value)} />
            {formErrors.previewImage && <p className="error">{formErrors.previewImage}</p>}
          </div>

          <br />

          <div className="form-group">
            <input type="text" placeholder="Image URL" value={imageUrl1} onChange={(e) => setImageUrl1(e.target.value)} />
            {formErrors.imageUrl1 && <p className="error">{formErrors.imageUrl1}</p>}
          </div>

          <br />

          <div className="form-group">
            <input type="text" placeholder="Image URL" value={imageUrl2} onChange={(e) => setImageUrl2(e.target.value)} />
            {formErrors.imageUrl2 && <p className="error">{formErrors.imageUrl2}</p>}
          </div>

          <br />

          <div className="form-group">
            <input type="text" placeholder="Image URL" value={imageUrl3} onChange={(e) => setImageUrl3(e.target.value)} />
            {formErrors.imageUrl3 && <p className="error">{formErrors.imageUrl3}</p>}
          </div>

          <br />

          <div className="form-group">
            <input type="text" placeholder="Image URL" value={imageUrl4} onChange={(e) => setImageUrl4(e.target.value)} />
            {formErrors.imageUrl4 && <p className="error">{formErrors.imageUrl4}</p>}
          </div>

          <br />
        </div>

        {/* This is the final submit button */}
        <button type="submit">Update Spot</button>
      </form>
    </div>
  );
};

// I believe this lets other files use the update spot form
export default UpdateSpotForm;