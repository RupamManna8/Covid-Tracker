import { useState } from "react";
import { fetchCovidDataByCountry } from "../features/covid/covidSlice";
import { useDispatch, useSelector } from "react-redux";
import '../App.css'

const styles = {
    statsList: {
      background: '#f0f0f0',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      maxWidth: '600px',
      margin: '20px',
      textAlign: 'left',
    },
    listItem: {
      margin: '10px 0',
      padding: '5px 0',
      borderBottom: '1px solid #ddd',
    },
  };


const CountryCovidStats = () => {
  const [country, setCountry] = useState("");
  const dispatch = useDispatch();
  const { countryData, statusCountry, errorCountry } = useSelector((state) => state.covid);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchCovidDataByCountry(country));
  };

  if (statusCountry === 'loading') return <p>Loading country data...</p>;
  if (errorCountry) return <p>Error fetching country data: {errorCountry}</p>;

  return (
    <div>
      <form onSubmit={handleSubmit} className="country-form">
        <input
          type="text"
          value={country}
          className="country-input"
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Enter country name"
        />
        <button className="submit-btn" type="submit">Fetch Data</button>
      </form>
    
      {countryData && Object.keys(countryData).length>0 && (
        <div style={styles.statsList}>
          <p style={styles.listItem}>Country: {countryData.Country_text}</p>
          <p style={styles.listItem}>
            Active Cases:{" "}
            <span className="danger">{countryData["Active Cases_text"]}</span>
          </p>
          <p style={styles.listItem}>
            Last Update: {countryData["Last Update"]}
          </p>
          <p style={styles.listItem}>
            New Cases:{" "}
            <span className="danger">{countryData["New Cases_text"]}</span>
          </p>
          <p style={styles.listItem}>
            New Deaths: {countryData["New Deaths_text"]}
          </p>
          <p style={styles.listItem}>
            Total Cases: {countryData["Total Cases_text"]}
          </p>
          <p style={styles.listItem}>
            Total Deaths:{" "}
            <span className="danger"> {countryData["Total Deaths_text"]}</span>
          </p>
          <p style={styles.listItem}>
            Total Recovered:{" "}
            <span className="recovered">
              {" "}
              {countryData["Total Recovered_text"]}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default CountryCovidStats;
