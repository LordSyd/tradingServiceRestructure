import React, { useState, useContext, useEffect, Fragment } from 'react';
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
import CustomizedTablesAktien from "../aktienTable/aktienTable"
import CustomizedTablesCustomer from "../customerTable/customerTable";
import SelectedCustomerContext from "../../context/selectedCustomer/selectedCustomerContext";


const CustomerDetails = () => {

  const loading = false

  const override = css`
        display: block;
        margin: 0 auto;
        border-color: white;
    `;

  let [color, setColor] = useState("#ffffff");
  //dt --> change Unix time stamp 



  return (
      <Fragment >
        {loading ? (
          <div className="spinner-placement">
            <BeatLoader color={color} loading={loading} css={override} size={20}></BeatLoader>
          </div>
        ) :

          <Fragment>
              <CustomizedTablesCustomer />
          </Fragment>
        }

      </Fragment>
  )
};

export default CustomerDetails;