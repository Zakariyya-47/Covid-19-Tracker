import React, {useState, useEffect} from 'react';
import './App.css';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
  BottomNavigation,} 
from "@material-ui/core";
import InfoBox from './InfoBox';
import Map from "./Map";
import Table from "./Table";
import {sortData, prettyPrintStat} from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
import SocialFollow from "./SocialFollow";
import ReactGA from "../node_modules/react-ga";

function App() {
const [countries, setCountries] = useState([]);
const [country, setCountry] = useState("worldwide");
const [countryInfo, setCountryInfo] = useState({});
const [tableData, setTableData] = useState([]);
const [mapCenter, setMapCenter] = 
useState ({lat: -13.1403507, lng: 27.8493049}); 
const [mapZoom, setMapZoom] = useState(6);
const[mapCountries, setMapCountries] = useState([]);
const [casesType, setCasesType] = useState("cases");


function initializeReactGA() {
  ReactGA.initialize('UA-174304211-1');
  ReactGA.pageview('/homepage');
}


  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    });
}, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch ("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country, //umited states, united kingdon
            value: country.countryInfo.iso2 //us,usa.fr
          }));
          
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);

          setMapCountries(data);
      });
    };
    getCountriesData();
  }, []);


    const onCountryChange = async (event) => {
      const countryCode =event.target.value;
      setCountry(countryCode);

      const url = 
        countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all" 
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then(response => response.json())
    .then((data) => {
      setCountry(countryCode);
      setCountryInfo(data);

          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);
    });
    };
    
  return (
    <div className="app__page">
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {/*loop through all the countries and show a drop menu*/}
            
              {
                countries.map (country=> (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
    
        <div className="app__stats">
            <InfoBox
            isRed
             active={casesType ==="cases"}
             onClick={(e) => setCasesType("cases")}
             title="Coronavirus Cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)}/>

            <InfoBox  
            active={casesType ==="recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)}/>

            <InfoBox
            isRed
            active={casesType ==="deaths"} 
            onClick={(e) => setCasesType("deaths")} 
            title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)}/>
        </div>
        
        <Map casesType={casesType} 
        countries={mapCountries}
        center={mapCenter}
        zoom={mapZoom}
        />
      </div>
              
      <Card className="app__right">
      <CardContent>
          <h3>Live Cases by Country</h3>
            <Table countries={tableData}></Table>
          <h3 className="app__graphTitle">Worldwide new {casesType}</h3>
            <LineGraph className="app__graph" casesType={casesType}/>
      </CardContent>
      </Card>
    </div>
    <div className="app__footer">
      <footer>Designed and Devoloped by Zakariyya D</footer>
                <SocialFollow/>
      </div>
    </div>
  );
}

export default App;