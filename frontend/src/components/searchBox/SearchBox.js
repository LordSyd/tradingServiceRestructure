import React, { useState, useContext, useEffect, Fragment } from 'react';
import SearchBoxContext from '../../context/searchShare/searchShareContext';
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/react";
import SearchShare from '../searchbar/searchShare'
import SearchCustomer from "../searchbar/searchCustomer";
import addCustomerButton from "../button/addCustomerButton";

const SearchBox = () => {
    const searchBoxContext = useContext(SearchBoxContext)
    const { stocks, getStocks, loading } = searchBoxContext;


    const override = css`
        display: block;
        margin: 0 auto;
        border-color: white;
    `;
    const onSubmit = (namePart) => {
        getStocks(namePart)
    }
    /*const { wind, maxTemp, minTemp, pressure, temp, feelsLike, humidity, icon, name } = stocks;*/

    let [color, setColor] = useState("#ffffff");
    useEffect(() => {
        /*getStocks();*/
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
                        <h3>Search Share</h3>
                        <SearchShare onSubmit={onSubmit}/>

                        <h3>Search Customer</h3>
                        <SearchCustomer onSubmit={onSubmit} />
                        {addCustomerButton()}
                    </div>
                )}
        </div>
    )
};

export default SearchBox;