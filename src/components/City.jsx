// Displays detailed information about a city, including name, date visited, notes, and a link to Wikipedia
import styles from "../styles/City.module.css";
import { useParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext.jsx";
import { useEffect } from "react";
import { formatDate, flagEmojiToPNG } from "../utility/Helpers.jsx";
import Spinner from "./Spinner.jsx";
import BackButton from "./BackButton.jsx";

function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();

  useEffect(() => {
    if (id) {
      getCity(id);
    }
  }, [id]);

  if (isLoading) return <Spinner />;

  if (!currentCity) {
    return <p>City not found.</p>;
  }

  const {
    cityName = "Unknown",
    emoji = "",
    date = null,
    notes = "",
  } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{flagEmojiToPNG(emoji)}</span> <span>{cityName}</span>
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName.replace(/ /g, "_")}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>
      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
