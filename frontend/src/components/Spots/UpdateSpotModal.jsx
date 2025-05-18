import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { updateSpot } from '../../store/spots';
import './Spots.css';

function UpdateSpotModal({ spot }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [country, setCountry] = useState(spot.country);
  const [lat, setLat] = useState(spot.lat.toString());
  const [lng, setLng] = useState(spot.lng.toString());
  const [name, setName] = useState(spot.name);
  const [description, setDescription] = useState(spot.description);
  const [price, setPrice] = useState(spot.price.toString());
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (description.length < 30) {
      setErrors({ description: 'Description must be at least 30 characters' });
      return;
    }

    const spotData = {
      address,
      city,
      state,
      country,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      name,
      description,
      price: parseFloat(price)
    };

    await dispatch(updateSpot({ spotId: spot.id, spotData }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <>
      <h1>Update Your Spot</h1>
      <form onSubmit={handleSubmit} className="spot-form">
        <div className="form-group">
          <label>Where's your place located?</label>
          <p>Guests will only get your exact address once they booked a reservation.</p>
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Street Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Describe your place to guests</label>
          <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
          <textarea
            placeholder="Please write at least 30 characters"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            minLength={30}
          />
        </div>

        <div className="form-group">
          <label>Create a title for your spot</label>
          <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
          <input
            type="text"
            placeholder="Name of your spot"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Set a base price for your spot</label>
          <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
          <input
            type="number"
            placeholder="Price per night (USD)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Liven up your spot with photos</label>
          <p>Submit a link to at least one photo to publish your spot.</p>
          <input
            type="text"
            placeholder="Preview Image URL"
            value={spot.previewImage}
            onChange={(e) => dispatch(updateSpot({ spotId: spot.id, spotData: { previewImage: e.target.value } }))}
            required
          />
        </div>

        {Object.values(errors).map((error, idx) => (
          <p key={idx} className="error">{error}</p>
        ))}

        <button type="submit" className="submit-button">Update Spot</button>
      </form>
    </>
  );
}

export default UpdateSpotModal;
