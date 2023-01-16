import React, { Fragment, useEffect, useContext, useState } from 'react';
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
import CustomizedTablesAktien from "../aktienTable/aktienTable"
import CustomizedTablesDepot from "../depotTable/depotTable";
import SellSharesButton from "../button/sellShareButton"
import SelectedCustomerContext from "../../context/selectedCustomer/selectedCustomerContext";

const Depot = (props) => {

    useEffect(() => {
        // eslint-disable-next-line
    }, []);

    const override = css`
    display: block;
    margin: 0 auto;
    border-color: white;
`;
    let [color, setColor] = useState("#ffffff");
    /*const selectedCustomerContext = useContext(SelectedCustomerContext)*/


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