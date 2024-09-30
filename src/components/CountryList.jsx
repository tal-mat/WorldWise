// Displays a list of unique countries with their emojis derived from the cities' data
import styles from "../styles/CountryList.module.css";
import Spinner from "./Spinner.jsx";
import CountryItem from "./CountryItem.jsx";
import Message from "./Message.jsx";
import { useCities } from "../contexts/CitiesContext.jsx";

function CountryList() {
  const { cities, isLoading } = useCities();

  // Show loading spinner if data is loading
  if (isLoading) return <Spinner />;

  // Reduces the cities array into a unique list of countries with their corresponding emoji.
  // For each city, it checks if the country is already in the result; if not, adds the country and emoji to the array.
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  if (!cities.length)
    return (
      // Show a message if no cities are available
      <Message message={"Add your first city by click on a city on the map"} />
    );
  return (
    // Render each country item
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
