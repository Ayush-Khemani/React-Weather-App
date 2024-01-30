import React from "react";
import { createContext, useContext } from "react";

export const WeatherContext = createContext({
    icon : "",
    imageCom : "",
    city : "",
    updateCity : (city) => {},
    country : "",
    description : "",
    temp : "",
    FeelsLike : "", 
    Wind : "" ,
    Humidity : "",
    Pressure : "",
    foreCastData : [],
    foreCastSet : (data) => {},
    minTemp : 0,
    maxTemp : 0

});


export const WeatherProvider = WeatherContext.Provider;


export const useWeather = () => {
    return useContext(WeatherContext);
}

