import { useNavigate } from 'react-router-dom';

const CreateSpotButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/spots/new');
  };

  return (
    <button className="create-spot-btn" onClick={handleClick}>
      Create a New Spot
    </button>
  );
};

export default CreateSpotButton;
