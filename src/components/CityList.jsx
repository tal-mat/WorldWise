// Displays a list of cities or a loading spinner/message based on the state
import styles from "../styles/CityList.module.css";
import Spinner from "./Spinner.jsx";
import CityItem from "./CityItem.jsx";
import Message from "./Message.jsx";
import { useCities } from "../contexts/CitiesContext.jsx";

function CityList() {
  const { cities, isLoading } = useCities();

  // Show loading spinner if data is loading
  if (isLoading) return <Spinner />;

  if (!cities.length)
    // Show a message if no cities are available
    return (
      <Message
        message={"Add your first city by clicking on a city on the map"}
      />
    );

  return (
    // Render each city item on the list
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
