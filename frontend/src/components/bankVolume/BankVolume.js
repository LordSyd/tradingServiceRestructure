import React, { Fragment, useEffect, useContext, useState } from 'react';
import bankVolumeContext from '../../context/bankVolume/bankVolumeContext';
import { v4 as uuidv4 } from 'uuid';
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/react";


const BankVolume = () => {
  const bnkVolumeContext = useContext(bankVolumeContext);
  const { getVolume, loading, bankVolume } = bnkVolumeContext;

  let [color, setColor] = useState("#ffffff");
  const override = css`
  display: block;
  margin: 0 auto;
  border-color: white;
`;





  return (
    <Fragment>
     <div className="container-covid">
        {loading ? (
          <div className="spinner-placement">
            <BeatLoader color={color} loading={loading} css={override} size={20}></BeatLoader>
          </div>
        ) : (
            <div>
              <h1>{bankVolume} €</h1>
            </div>
        )}
      </div>
    </Fragment>
  )
};

export default BankVolume;