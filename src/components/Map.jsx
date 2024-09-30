import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import styles from "../styles/Map.module.css";

import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Button from "./Button";
import { flagEmojiToPNG } from "../utility/Helpers.jsx";

function Map() {
  const { cities } = useCities(); // Fetch cities from context
  const [mapPosition, setMapPosition] = useState([40, 0]); // Initial map position
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation(); // Geolocation hook
  const [mapLat, mapLng] = useUrlPosition(); // URL-based position

  // Effect to update the map position based on URL coordinates
  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    // console.log(`mapLat: ${mapLat} mapLng: ${mapLng}`);
  }, [mapLat, mapLng]);

  // Effect to update the map position based on geolocation
  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    // console.log(
    //   `geolocationPosition.lat: ${geolocationPosition.lat} geolocationPosition.lng: ${geolocationPosition.lng}`,
    // );
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {/* Button to get user geolocation */}
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}

      {/* Map container */}
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {/* Map markers for each city */}
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{flagEmojiToPNG(city.emoji)}</span>{" "}
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        {/* Update map center */}
        <ChangeCenter position={mapPosition} />
        {/* Detect clicks on the map */}
        <DetectClick />
      </MapContainer>
    </div>
  );
}

// Set map center
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

// Detect map clicks and navigate to form with lat/lng in query parameters
function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      // console.log(
      //   `Map clicked at latitude: ${e.latlng.lat}, longitude: ${e.latlng.lng}`,
      // ); // Log lat/lng on click
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`); // Navigate with the lat/lng in the query params
    },
  });
}

export default Map;
