import React, { Fragment, useEffect, useContext, useState } from 'react';
import DepotContext from '../../context/depot/depotContext';
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
import CustomizedTablesAktien from "../aktienTable/aktienTable"
import CustomizedTablesDepot from "../depotTable/depotTable";
import SellSharesButton from "../button/sellShareButton"
import SelectedCustomerContext from "../../context/selectedCustomer/selectedCustomerContext";

const Depot = (props) => {
    const depotContext = useContext(DepotContext);
    const { getCovid: getDepot, covidData, loading } = depotContext;

    useEffect(() => {
        getDepot();
        // eslint-disable-next-line
    }, []);

    const override = css`
    display: block;
    margin: 0 auto;
    border-color: white;
`;
    let [color, setColor] = useState("#ffffff");
    /*const selectedCustomerContext = useContext(SelectedCustomerContext)*/



    const { confCases, deaths, recovered, activeCases, newCases } = covidData;
    return (
            <div className="container-covid">
                <Fragment>
                    <CustomizedTablesDepot depot={props.depot}/>
                    {props.depot === undefined
                        ? <Fragment/>
                        : <SellSharesButton/>
                    }

                </Fragment>


            </div>
    )
};

export default Depot;