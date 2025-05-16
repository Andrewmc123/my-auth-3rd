import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './Spots.css';

function CreateSpotModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
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

    // We'll implement the createSpot action later
    dispatch(createSpot(spotData))
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
      <h1>Create a New Spot</h1>
      <form onSubmit={handleSubmit} className="spot-form">
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          {errors.address && <p className="error">{errors.address}</p>}
        </div>

        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          {errors.city && <p className="error">{errors.city}</p>}
        </div>

        <div className="form-group">
          <label>State</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
          {errors.state && <p className="error">{errors.state}</p>}
        </div>

        <div className="form-group">
          <label>Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
          {errors.country && <p className="error">{errors.country}</p>}
        </div>

        <div className="form-group">
          <label>Latitude</label>
          <input
            type="number"
            step="0.000001"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            required
          />
          {errors.lat && <p className="error">{errors.lat}</p>}
        </div>

        <div className="form-group">
          <label>Longitude</label>
          <input
            type="number"
            step="0.000001"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            required
          />
          {errors.lng && <p className="error">{errors.lng}</p>}
        </div>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          {errors.price && <p className="error">{errors.price}</p>}
        </div>

        <button type="submit" className="spot-submit-btn">Create Spot</button>
      </form>
    </>
  );
}

export default CreateSpotModal;
