import React, { useState, useContext, useEffect, Fragment } from 'react';
import SearchBoxContext from '../../context/searchBox/searchBoxContext';
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/react";

const SearchBox = () => {
    const searchBoxContext = useContext(SearchBoxContext)
    const { weather, getWeather, loading } = searchBoxContext;


    const override = css`
        display: block;
        margin: 0 auto;
        border-color: white;
    `;

    const { wind, maxTemp, minTemp, pressure, temp, feelsLike, humidity, icon, name } = weather;

    let [color, setColor] = useState("#ffffff");
    useEffect(() => {
        getWeather();
        // eslint-disable-next-line
    }, []);

    return (

        <div className="container-dash">
            {loading ? (
                <div className="spinner-placement">
                    <BeatLoader color={color} loading={loading} css={override} size={20}></BeatLoader>
                </div>
            ) :
                (
                    <div>
                        <h1>React Search</h1>
                    </div>
                )}


        </div>


    )
};

export default SearchBox;