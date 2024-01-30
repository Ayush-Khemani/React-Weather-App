import React from "react";
import { useWeather } from "../../WeatherContext/WeatherContext";

function Card() {

    const { 
        imageCom, city, country, description, temp, FeelsLike, Humidity, Pressure, Wind, minTemp, maxTemp
    } = useWeather()


    return (
        <div className="flex flex-col rounded-xl overflow-hidden justify-around px-2 py-3 text-white bg-gray-500">
            <div className="flex overflow-hidden justify-between text-l px-7">
                <div className="flex flex-col">
                    <div>
                        {city}, {country}
                    </div>
                    <div>
                        {description}
                    </div>
                    <div>
                    H:{maxTemp} <sup>°</sup> L:{minTemp} <sup>°</sup>   
                    </div>
                </div>

                <div>
                    <img src={imageCom} alt=""
                        className="w-32" />
                </div>
            </div>

            <div className="flex overflow-hidden justify-between px-7">

                <div className="text-6xl text-start pt-9">
                    {temp} <sup className="text-3xl"> ° C </sup>
                </div>

                <div className="flex flex-col text-start">
                    <p>Details </p>

                    <p>Feels Like: {FeelsLike} <sup>° C</sup></p>
                    <p>Wind: {Wind} mph</p>
                    <p>Humidity: {Humidity} %</p>
                    <p>Pressure: {Pressure} inHg</p>

                </div>

            </div>

        </div>
    )
}

export default Card