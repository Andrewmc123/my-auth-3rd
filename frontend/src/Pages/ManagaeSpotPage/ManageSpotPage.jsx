import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ManageSpotCard from "../../components/ManageSpotCard/ManageSpotCard";
import CreateSpotButton from "../../components/CreateSpotButton/CreateSpotButton";
import { loadAllSpots } from "../../store/spots";

// I believe this sets up the page for managing the user's spots
const ManageSpotsPage = () => {

    // I believe this is getting the dispatch function for Redux
    const dispatch = useDispatch();

    // This is getting the current logged-in user's id
    const currUserId = useSelector((state) => state.session.user.id)

    // This is getting all spots from the store
    const spots = useSelector((state) => state.spots);

    // I believe this filters out just the spots that belong to the current user
    const mySpots = Object.values(spots).filter((spot) => spot.ownerId === currUserId);

    // This is checking if spots have been loaded or not
    const [isLoaded, setIsLoaded] = useState(false);

    // I believe this loads the user's spots the first time the page runs
    useEffect(() => {
        if (!isLoaded) {
            // This is doing the dispatch to load all spots into the store
            dispatch(loadAllSpots(mySpots))

            // I believe this stops the loading from happening again
            setIsLoaded(true)
        }
    }, [dispatch, setIsLoaded, isLoaded, mySpots])

    // This is doing the rendering of the page with a header, button, and the user's spots
    return (
        <div className="spot-list">
            <div>
                <h1>Manage Spots</h1>

                {/* I believe this button lets the user go create a new spot */}
                <CreateSpotButton />
            </div>

            {/* I believe this section shows all the user's spots in cards */}
            <div className="">
                {mySpots.map((spot) => (    
                    <ManageSpotCard key={spot.id} spot={spot} />
                ))}
            </div> 
        </div>
    )
}

// I believe this lets other files use this component
export default ManageSpotsPage;