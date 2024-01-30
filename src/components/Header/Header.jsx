import React, { useRef } from "react";
import { useWeather } from "../../WeatherContext/WeatherContext";

function Header() {

    const SearchRef = useRef();

    const { updateCity } = useWeather();
    const handleOnClick = () => {
        updateCity(SearchRef.current.value);
    }



    return (
        <div className=" w-screen flex gap-3 justify-center text-black">
            <input
                type="text"
                placeholder="eg: London"
                className="border border-gray-400 rounded-xl px-2 py-2"
                ref={SearchRef}
            />

            <button onClick={handleOnClick} className="bg-green-500 rounded-xl px-2 py-2">Search</button>
        </div>
    )
}

export default Header