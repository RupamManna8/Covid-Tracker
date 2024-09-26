import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  fetchCovidDataWorld } from "../features/covid/covidSlice";
import { useSpring,animated  } from "react-spring";
import '../App.css'
import Spinner from "../components/spinner";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend , CategoryScale, LinearScale, BarElement} from 'chart.js';


 ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

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

const WorldCovidStats = () => {
  const dispatch = useDispatch();
  const { worldData, statusWorld, errorWorld }= useSelector((state) => state.covid);

  useEffect(() => {
    dispatch(fetchCovidDataWorld());
  }, [dispatch]);


  const chartData = {
    labels: ['Total Cases', 'Total Recovered', 'Total Deaths'],
    datasets: [
      {
        label: 'COVID-19 Statistics',
        data: [
          worldData["Total Cases_text"]?.replace(/,/g, '') || 0,
          worldData["Total Recovered_text"]?.replace(/,/g, '') || 0,
          worldData["Total Deaths_text"]?.replace(/,/g, '') || 0,
        ],
        backgroundColor: [
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255,99,132,1)',
        ],
        borderWidth: 1,
      },
    ],
  };


  
    const fade = useSpring({
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: { duration: 1000 },
    });
  

    if (statusWorld === 'loading') return <div className="spinner-container"><Spinner/></div>;
    if (errorWorld) return <p>Error fetching global data: {errorWorld}</p>;
  
  return (
    <animated.div style={fade} className="App">
            <h1>Global Covid-19 statistics</h1>
        <div style={{display:"flex",flexDirection:"row"}}>

    
        <div style={styles.statsList}>
          <p style={styles.listItem}>Country: {worldData.Country_text}</p>
          <p style={styles.listItem} >Active Cases: <span className="danger">{worldData["Active Cases_text"]}</span></p>
          <p style={styles.listItem}>Last Update: {worldData["Last Update"]}</p>
          <p style={styles.listItem}>New Cases: <span className="danger">{worldData["New Cases_text"]}</span></p>
          <p style={styles.listItem}>New Deaths: {worldData["New Deaths_text"]}</p>
          <p style={styles.listItem}>Total Cases: {worldData["Total Cases_text"]}</p>
          <p style={styles.listItem}>Total Deaths: <span className="danger"> {worldData["Total Deaths_text"]}</span></p>
          <p style={styles.listItem}>Total Recovered: <span className="recovered"> {worldData["Total Recovered_text"]}</span></p>
        </div>
        <div style={{ width: '600px', height: '400px' }}>
  <Pie data={chartData} />
</div>  <div style={{ width: '600px', height: '400px' }}>
  <Bar data={chartData} />
</div>
        </div>
      
      
    </animated.div>
  );
};

export default WorldCovidStats;
