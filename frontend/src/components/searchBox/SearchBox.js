import React, { useState, useContext, useEffect, Fragment } from 'react';
import SearchBoxContext from '../../context/searchShare/searchShareContext';
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/react";
import SearchShare from '../searchbar/searchShare'
import SearchCustomerByName from "../searchbar/searchCustomerByName";
import SearchCustomerById from "../searchbar/searchCustomerById";
import AddCustomerButton from "../button/addCustomerButton";
import GetCustomerContext from "../../context/getCustomer/getCustomerContext";




const SearchBox = () => {
    const searchBoxContext = useContext(SearchBoxContext)
    const { getStocks, loading } = searchBoxContext;
    const getCustomerContext = useContext(GetCustomerContext)
    const { getCustomersByName, getCustomerById } = getCustomerContext;

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

    const onSubmitCustomerName = (customer) => {
        console.log(customer)
        getCustomersByName(customer)
    }
    const onSubmitCustomerId = (id) => {
        console.log(Number.parseInt(id))
        getCustomerById(Number.parseInt(id))
    }
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

                        <h3>Search Customer by Name</h3>
                        <SearchCustomerByName onSubmit={onSubmitCustomerName} />
                        <h3>Search Customer by ID</h3>
                        <SearchCustomerById onSubmit={onSubmitCustomerId} />
                        <AddCustomerButton />
                    </div>
                )}
        </div>
    )
};

export default SearchBox;