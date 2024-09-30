// Renders a city item with a link, emoji, name, date, and a delete button
import styles from "../styles/CityItem.module.css";
import { Link } from "react-router-dom";
import { formatDate, flagEmojiToPNG } from "../utility/Helpers.jsx";
import { useCities } from "../contexts/CitiesContext.jsx";

function cityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  // Handles deletion of the city when the deleting button is clicked
  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${id === currentCity.id ? styles["cityItem--active"] : ""}`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{flagEmojiToPNG(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default cityItem;
