import React, { Fragment, useContext, useState } from 'react';
import bankVolumeContext from '../../context/bankVolume/bankVolumeContext';

import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/react";


const BankVolume = () => {
  const bnkVolumeContext = useContext(bankVolumeContext);
  const { loading, bankVolume } = bnkVolumeContext;

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
              <h1>{bankVolume?.toLocaleString('de-DE')} €</h1>
            </div>
        )}
      </div>
    </Fragment>
  )
};

export default BankVolume;