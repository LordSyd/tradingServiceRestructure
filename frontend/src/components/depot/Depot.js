import React, { Fragment, useEffect } from 'react';
import { css } from "@emotion/react";
import SellSharesButton from "../button/SellShareButton"
import ClickableStockTableSell from "../depotTable/ClickableStockTableSell";

const Depot = (props) => {

    useEffect(() => {
        // eslint-disable-next-line
    }, []);



    return (
            <div className="container-covid">
                <Fragment>
                    <ClickableStockTableSell depot={props.depot}/>
                    {props.depot == undefined
                        ? <Fragment/>
                        : <SellSharesButton onClick={props.onClickSell}/>
                    }

                </Fragment>


            </div>
    )
};

export default Depot;