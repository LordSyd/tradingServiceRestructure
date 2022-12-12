import React, { Fragment, useEffect, useContext, useState } from 'react';
import bankVolumeContext from '../../context/bankVolume/bankVolumeContext';
import { v4 as uuidv4 } from 'uuid';
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/react";


const BankVolume = () => {
  const bnkVolumeContext = useContext(bankVolumeContext);
  const { getPrice,loading, gasStation } = bnkVolumeContext;

  let [color, setColor] = useState("#ffffff");
  const override = css`
  display: block;
  margin: 0 auto;
  border-color: white;
`;


  useEffect(() => {
    getPrice();
  }, []);

  const { contact, distance, prices, name, location} = gasStation;
  return (
    <Fragment>
     <div className="container-covid">
        {loading ? (
          <div className="spinner-placement">
            <BeatLoader color={color} loading={loading} css={override} size={20}></BeatLoader>
          </div>
        ) : (

            <Fragment>
            <div className="grid-covid">
                <div><i className="fas fa-gas-pump"> </i> </div>
                {name}
            </div>
            <div className="grid-covid">
                <div><i className="fas fa-dollar-sign"> </i> </div>
               Diesel: {prices[0].amount}€ || 
               Super: {prices[1][0].amount}€
            </div>
            <div className="grid-covid">
                <div><i className="fas fa-map-pin"> </i> </div>
                {location.address}
            </div>

            <div className="grid-covid">
                <div><i className="fas fa-car"> </i> </div>
                Distance: {distance.toFixed(2)} km
            </div>
        </Fragment>
        )}


      </div>
    </Fragment>

  )
};

export default BankVolume;