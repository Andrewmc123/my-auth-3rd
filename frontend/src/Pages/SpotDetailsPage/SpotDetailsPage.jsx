import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { readSpotThunk } from "../../store/spots";
import { readReviewsThunk } from "../../store/reviews";
import SpotInfo from "../../components/SpotInfo/SpotInfo";
import ReviewInfo from "/../components/ReviewInfo/ReviewInfo";

// I believe this sets up the SpotDetailsPage component
const SpotDetailsPage = () => {

  // I believe this lets us send actions to the store
  const dispatch = useDispatch()

  // This is getting the spotId from the URL
  const { spotId } = useParams()

  // I believe this keeps track of when data is finished loading
  const [isLoaded, setIsLoaded] = useState(false)

  // This is doing the job of getting the spot info from the store
  const spotDetails = useSelector(state => state.spots);

  // I believe this gets the current logged in user from the store
  const currUser = useSelector((state) => state.session.user);

  // This is doing the work to load spot and reviews when the page runs
  useEffect(() => {
    dispatch(readSpotThunk(spotId))
      .then(() => {
        return dispatch(readReviewsThunk(spotId));
      })
      .then(() => {
        setIsLoaded(true);
      });
  }, [dispatch, spotId]);

  // I believe this shows the spot and review info if it's done loading
  return isLoaded ? (
    <div className="page">
      <SpotInfo spotDetails={spotDetails[spotId]} />
      <ReviewInfo spotDetails={spotDetails[spotId]} currUser={currUser} spotId={spotId} />
    </div>
  ) : (
    // This is doing a loading message while the data is not ready
    <h3>Loading...</h3>
  );
}

// I believe this lets other files use this page
export default SpotDetailsPage;