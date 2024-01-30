import { useCallback, useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header/Header'
import Card from './components/Card/Card'
// import useApi from './components/Hooks/useApi'
import { WeatherProvider } from './WeatherContext/WeatherContext'
import Forecast from './components/Forecast/Forecast'
// import { useEffect } from 'react';
// import Find from './components/Find/Find'



// const [ FindLatAndLon, useApi ]= Find();


function App() {


  const [icon, setIco] = useState("")
  const [imageCom, setImageCom] = useState("")
  const [city, setCity] = useState("Budapest");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [temp, setTemp] = useState();
  const [FeelsLike, setFeelsLike] = useState();
  const [Humidity, setHumidity] = useState();
  const [Wind, setWind] = useState();
  const [Pressure, setPressure] = useState();
  const [foreCastData, setforeCastData] = useState([]);
  const [minTemp, setMinTemp] = useState(0);
  const [maxTemp, setMaxTemp] = useState(0);


  const APIKey = "";

  const foreCastSet = (data) => {
    setforeCastData(data);
  }

  const Search = async (city) => {
    const response1 = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`);
    const data1 = await response1.json();

    const latitude = data1[0].lat;
    const longitude = data1[0].lon;


    const response2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKey}`);
    const data2 = await response2.json();

    const icon = data2.weather[0].icon
    setIco(data2.weather[0].icon);
    setImageCom(`http://openweathermap.org/img/w/${icon}.png`)
    setCity(city);
    setCountry(data2.sys.country);
    setDescription((data2.weather[0].description).toUpperCase())
    setTemp(Math.floor((data2.main.temp) - 273.15));
    setFeelsLike(Math.floor((data2.main.feels_like) - 273.15))
    setMinTemp(Math.floor((data2.main.temp_min) - 273.15))
    setMaxTemp(Math.floor((data2.main.temp_max) - 273.15))
    setHumidity(data2.main.humidity)
    setWind(Math.floor((data2.wind.speed) * 2.23694))
    setPressure((data2.main.pressure * 0.02952998057228486).toFixed(2));
  }

  useEffect(() => {
    if (city)
      Search(city);
  }, [city, setCity])

 

  const updateCity = (city) => {
    Search(city)

  }

  return (
    <WeatherProvider value={{ icon, imageCom, city, country, description, temp, FeelsLike, Wind, Humidity, Pressure, updateCity, foreCastData, foreCastSet, minTemp, maxTemp }}>
      <div className='bg-slate-200'>
        <div className='bg-slate-300 px-3 py-3 rounded-lg shadow-xl'>
          <Header />

        </div>
        <div className='flex justify-center'>
          <div className='outline-none px-3 py-3 mt-10 w-5/12 '>

            <Card />
          </div>
        </div>

        <div className='mt-10 flex flex-col items-center'>
          <Forecast />
        </div>
        <footer className='bg-green-300 mt-14'>
          <p>&copy; 2024 Ayush Khemani</p>
        </footer>
      </div>
    </WeatherProvider>
  )
}

export default App;
