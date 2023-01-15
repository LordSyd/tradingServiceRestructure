import React, { useState, useContext, useEffect, Fragment } from 'react';
import AktienDetailsContext from '../../context/aktienDetails/aktienDetailsContext';
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
import CustomizedTablesAktien from "../aktienTable/aktienTable"
import CustomizedTablesCustomer from "../customerTable/customerTable";


const AktienDetails = () => {

  const aktienDetailsContext = useContext(AktienDetailsContext);
  const { hourlyForecast, getHourlyForecast, loading } = aktienDetailsContext;
  const { dt, temp } = hourlyForecast;

  useEffect(() => {
    getHourlyForecast();


  }, []);



  const override = css`
        display: block;
        margin: 0 auto;
        border-color: white;
    `;

  let [color, setColor] = useState("#ffffff");
  //dt --> change Unix time stamp 





  return (
      <div className="container-dash">
        {loading ? (
          <div className="spinner-placement">
            <BeatLoader color={color} loading={loading} css={override} size={20}></BeatLoader>
          </div>
        ) :

          <Fragment>
              <CustomizedTablesAktien />
              <CustomizedTablesCustomer />
          </Fragment>
        }

      </div>
  )
};

export default AktienDetails;