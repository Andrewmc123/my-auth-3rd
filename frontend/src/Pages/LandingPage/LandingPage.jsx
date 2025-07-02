import  { useEffect, useState } from "react";  
import { useDispatch, useSelector } from "react-redux";
import { loadAllSpots } from "../../store/spots";
import SpotCard from "../../components/SpotCard/SpotCard";

// I believe this is setting up the main landing page function
const LandingPage = () => {
  
  // I believe this gets the dispatch function so we can send actions to the store
  const dispatch = useDispatch();

  // This is getting all the spots from the Redux store and turning them into an array
  const spots = Object.values(useSelector((state)=> state.spots))

  // I believe this is checking if the spots have finished loading
  const [isLoaded, setIsLoaded] = useState(false);

  // This is doing the work of loading spots when the page first runs
  useEffect(() => {
    if (!isLoaded) {
      // I believe this sends an action to load all the spots
      dispatch(loadAllSpots()) 

      // I believe this sets the loading flag to true so it doesn't run again
      setIsLoaded(true); 
    }
  }, [dispatch, setIsLoaded, isLoaded]);

  

  return( 
    <div className="lpg-container">
      <div className="spot-list-container">
        {/* First Row */}
        <div className="spot-row">
          {spots?.slice(0, 4).map((spot) => (
            <div className="spot-row-item" key={spot.id}>
              <SpotCard spot={spot} />
            </div>
          ))}
        </div>
        {/* Second Row */}
        <div className="spot-row">
          {spots?.slice(4, 8).map((spot) => (
            <div className="spot-row-item" key={spot.id}>
              <SpotCard spot={spot} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
