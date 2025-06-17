import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSpotThunk } from '../../store/spots';
import { useNavigate } from 'react-router-dom';
import './CreateSpotPage.css';

const CreateSpotPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    const spotData = {
      name,
      address,
      city,
      state,
      country,
      price: Number(price),
      description,
    };

    try {
      const newSpot = await dispatch(createSpotThunk(spotData));
      navigate(`/spots/${newSpot.id}`);
    } catch (err) {
      const errObj = {};
      errObj.general = err.message || "Failed to create spot";
      setErrors(errObj);
    }
  };

  return (
    <div className="create-spot-container">
      <h2>Create a New Spot</h2>
      {errors.general && <p className="error">{errors.general}</p>}
      <form onSubmit={handleSubmit} className="create-spot-form">
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Address
          <input value={address} onChange={(e) => setAddress(e.target.value)} required />
        </label>
        <label>
          City
          <input value={city} onChange={(e) => setCity(e.target.value)} required />
        </label>
        <label>
          State
          <input value={state} onChange={(e) => setState(e.target.value)} required />
        </label>
        <label>
          Country
          <input value={country} onChange={(e) => setCountry(e.target.value)} required />
        </label>
        <label>
          Price per night
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </label>
        <label>
          Description
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
};

export default CreateSpotPage;
