import { useState, useEffect } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [availablePlaces, setAvailablePlaces] = useState([]);
  useEffect(() => {
    setIsFetching(true);
    //fetch a places from backEnd
    async function featchPlaces() {
      try {
        const respond = await fetch("http://localhost:3000/places");
        const data = await respond.json();
        if (!respond.ok) {
          throw new Error("Failed to fetch");
        }
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            data.places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error) {
        setError({ message: error.message || "could not featch" });
        setIsFetching(false);
      }
    }
    featchPlaces();
  }, []);
  if (error) {
    return <Error title="An Error Occurred!" message={error.message} />;
  }
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingtext="Places are Loading..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
