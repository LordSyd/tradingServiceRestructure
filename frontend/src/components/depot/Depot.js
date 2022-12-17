import React, { Fragment, useEffect, useContext, useState } from 'react';
import DepotContext from '../../context/depot/depotContext';
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
import CustomizedTablesAktien from "../aktienTable/aktienTable"
import CustomizedTablesDepot from "../depotTable/depotTable";
import ButtonAdd from "../button/sellShareButton"

const Depot = () => {
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

    const { confCases, deaths, recovered, activeCases, newCases } = covidData;
    return (
        <Fragment>
            <div className="container-covid">
                {loading ? (
                    <div className="spinner-placement">
                        <BeatLoader color={color} loading={loading} css={override} size={20}></BeatLoader>
                    </div>
                ) :
                    <div>
                        {CustomizedTablesDepot()}
                        {ButtonAdd()}
                    </div>
                }
            </div>
        </Fragment>

    )
};

export default Depot;