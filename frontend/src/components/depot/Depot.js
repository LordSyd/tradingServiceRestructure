import React, { Fragment, useEffect, useContext, useState } from 'react';
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
import CustomizedTablesAktien from "../aktienTable/aktienTable"
import CustomizedTablesDepot from "../depotTable/depotTable";
import SellSharesButton from "../button/sellShareButton"
import SelectedCustomerContext from "../../context/selectedCustomer/selectedCustomerContext";
import ClickableStockTableSell from "../depotTable/ClickableStockTableSell";

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




    const handleClick = (stock, shares) => {
        console.log(stock +" "+ shares)
    }
    return (
            <div className="container-covid">
                <Fragment>
                    {/*<CustomizedTablesDepot depot={props.depot}/>*/}
                    <ClickableStockTableSell depot={props.depot}/>
                    {props.depot === undefined
                        ? <Fragment/>
                        : <SellSharesButton onClick={props.onClickSell}/>
                    }

                </Fragment>


            </div>
    )
};

export default Depot;