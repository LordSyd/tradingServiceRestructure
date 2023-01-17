import React, { useState, useContext, useEffect, Fragment } from 'react';
import SearchShareContext from '../../context/searchShare/searchShareContext';
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/react";
import SearchShare from '../searchbar/searchShare'
import SearchSymbol from "../searchbar/SearchSymbol";
import SearchCustomerByName from "../searchbar/searchCustomerByName";
import SearchCustomerById from "../searchbar/searchCustomerById";
import AddCustomerButton from "../button/addCustomerButton";
import GetCustomerContext from "../../context/getCustomer/getCustomerContext";




const SearchBox = (props) => {
    const searchBoxContext = useContext(SearchShareContext)
    const { getStocks, loading, getStocksBySymbol} = searchBoxContext;
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

    const onSubmitSymbol = (symbols) => {
        getStocksBySymbol(symbols)
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
        <Fragment >
            {loading ? (
                <div className="spinner-placement">
                    <BeatLoader color={color} loading={loading} css={override} size={20}></BeatLoader>
                </div>
            ) :
                (
                    <Fragment>
                        <h3>Search Share</h3>
                        <SearchShare customer={props.customer} onSubmit={onSubmit}/>
                        <SearchSymbol customer={props.customer} onSubmit={onSubmitSymbol}/>

                        {props.customer
                            ? <Fragment/>
                            : <Fragment>

                            <h3>Search Customer by Name</h3>
                            <SearchCustomerByName onSubmit={onSubmitCustomerName} />
                            <h3>Search Customer by ID</h3>
                            <SearchCustomerById onSubmit={onSubmitCustomerId} />
                            <AddCustomerButton />
                            </Fragment>
                        }

                    </Fragment>
                )}
        </Fragment>
    )
};

export default SearchBox;