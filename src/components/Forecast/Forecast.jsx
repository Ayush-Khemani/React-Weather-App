import React, { useEffect } from "react";
import { useWeather } from "../../WeatherContext/WeatherContext";

function Forecast() {
    const APIKey = "691f190f6fda6735c93fe90163a8c06f";

    const { foreCastData, city, foreCastSet } = useWeather()

    const fetchdata = async () => {

        const response1 = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`);
        const data1 = await response1.json();

        const latitude = data1[0].lat;
        const longitude = data1[0].lon;

        const foreCast = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIKey}`)
        const resp = await foreCast.json();
        foreCastSet(resp);
        // console.log(resp);

    }

    function convertTo12HourFormat(apiTime) {
        var date = new Date(apiTime.replace(' ', 'T'));
        var time12hr = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

        return time12hr;
    }

    function kelvinToC(temperature) {
        return Math.floor(temperature - 273.15);
    }

    function toMph(data) {
        return Math.floor((data) * 2.23694);
    }
    useEffect(() => {
        fetchdata();
    }, [city]);

    if (!foreCastData || !foreCastData.list || foreCastData.list.length === 0) {
        return <div>Loading...</div>;
    }

    return (

        <div className="outline-none border border-black flex justify-around flex-row gap-4 pt-5 overflow-hidden w-3/4 rounded-xl bg-blue-300">
            {/* {convertTo12HourFormat(foreCastData.list[0].dt_txt)} */}
            <div className=" flex flex-col text-start justify-around">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index}>{convertTo12HourFormat(foreCastData.list[index]?.dt_txt)}
                    </div>
                ))}
            </div>
        
            <div className= "flex flex-col text-start justify-around">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div className="flex gap-3">
                    <img className="w-9" src={`http://openweathermap.org/img/w/${foreCastData.list[index]?.weather[0].icon}.png`} alt="" />
                    {foreCastData.list[index].weather[0].description.toUpperCase()}</div>
                ))}
            </div>
            <div className="flex flex-col text-start justify-around">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div>{kelvinToC(foreCastData.list[index].main.temp)} <sup>°C</sup></div>
                ))}
            </div>
            <div className="flex flex-col text-start justify-around">
                {Array.from({ length: 5 }).map((_, index) => (
                   <div>{toMph(foreCastData.list[index].wind.speed)} mph</div>
                ))}

            </div>
        </div>

    )
}

export default Forecast