import React, { useContext, useEffect, Fragment, useReducer, useState } from 'react'

import GridLayout from 'react-grid-layout';
import SearchBox from '../searchBox/SearchBox';
import AktienDetails from '../aktien/aktienDetails';
import AuthContext from '../../context/auth/authContext';
import { Responsive, WidthProvider } from 'react-grid-layout';
import useForceUpdate from 'use-force-update';
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/react";
import Depot from '../depot/Depot';
import BankVolume from '../bankVolume/BankVolume';
import SearchShare from '../searchbar/searchShare'
import axios from "axios";
import {REGISTER_SUCCESS} from "../../context/types";
import setAuthToken from "../../utils/setAuthToken";
import GetCustomerContext from "../../context/getCustomer/getCustomerContext";
import SelectedCustomerContext from "../../context/selectedCustomer/selectedCustomerContext";
import CustomizedTablesAktien from "../aktienTable/aktienTable";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from "@mui/material/Button";
import BuySharesButton from "../button/BuySharesButton";
import TextField from "@mui/material/TextField";
import SelectedStockContext from "../../context/selectedStock/SelectedStockContext";
import selectedStockContext from "../../context/selectedStock/SelectedStockContext";
import SearchBoxContext from "../../context/searchShare/searchShareContext";
import ClickableStockTable from "../depotTable/ClickableStockTable";
import getRoleByEmailContext from "../../context/getRoleByEmail/getRoleByEmailContext";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Home = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user } = authContext;
  const getCustomerContext = useContext(GetCustomerContext)
  const selectedCustomerContext = useContext(SelectedCustomerContext);


  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const handleClick = () => setOpen(true);



  const unAuthlayout = [
    { i: 'SearchedAktien', x: 0, y: 0, w: 7, h: 3, minW: 6, minH:2},
    { i: 'weatherSmall', x: 8, y: 0, w: 3, h: 2, minW: 4, maxW: 4,minH:2 },
    { i: 'standardRss', x: 0, y: 1, w: 3, h: 2, minW: 3, maxW: 4,minH:2 },
    { i: 'spotify', x: 3, y: 1, w: 3, h: 2, minW: 3, maxH: 3,minH:2 },
    { i: 'quote', x: 6, y: 2, w: 4, h: 2, minW: 4, maxH: 3,minH:2 },
    { i: 'corona', x: 0, y: 3, w: 10, h: 1.5, minW: 10, maxH: 2, maxW: 10 },
    { i: 'gas', x: 0, y: 3, w: 10, h: 1.5, minW: 10, maxH: 2, maxW: 10 },

  ]

  const authLayout = [
    { i: 'SearchedAktien', x: 0, y: 0, w: 7, h: 3, minW: 6,minH:2 },
    { i: 'weatherSmall', x: 8, y: 0, w: 3, h: 2, minW: 4, maxW: 4, minH:2},
    { i: 'notes', x: 0, y: 1, w: 5, h: 2,minH:2 },
    { i: 'notes-form', x: 6, y: 1, w: 5, h: 2,minH:2 },
    { i: 'standardRss', x: 0, y: 2, w: 3, h: 2, minW: 3 ,minH:2 },
    { i: 'spotify', x: 0, y: 3, w: 12, h: 2, minW: 12, maxH: 2 },
    { i: 'quote', x: 6, y: 2, w: 4, h: 2, minW: 4, maxH: 3,minH:2 },
    { i: 'corona', x: 0, y: 3, w: 12, h: 2, minW: 12, maxH: 2 },
    { i: 'gas', x: 0, y: 3, w: 12, h: 2, minW: 12, maxH: 2 },
  ]

  const unAuthlayoutMD = [
    { i: 'SearchedAktien', x: 0, y: 0, w: 8, h: 2, minW: 10,minH:2 },
    { i: 'weatherSmall', x: 5, y: 1, w: 2, h: 2, minW: 4, maxW: 4,minH:2 },
    { i: 'standardRss', x: 0, y: 1, w: 3, h: 2, minW: 4, maxW: 4,minH:2 },
    { i: 'spotify', x: 0, y: 3, w: 10, h: 2, minW: 10, maxH: 2},
    { i: 'quote', x: 5, y: 3, w: 2, h: 2, minW: 4, maxH: 3,minH:2 },
    { i: 'corona', x: 0, y: 2, w: 10, h: 2, minW: 10, maxH: 2 },
    { i: 'gas', x: 0, y: 2, w: 10, h: 2, minW: 10, maxH: 2 },
  ]

  const authLayoutMD = [
    { i: 'SearchedAktien', x: 0, y: 0, w: 8, h: 2, minW: 10,minH:2 },
    { i: 'weatherSmall', x: 5, y: 1, w: 2, h: 2, minW: 4, maxW: 4, minH:2 },
    { i: 'standardRss', x: 0, y: 1, w: 3, h: 2, minW: 4, maxW: 4 },
    { i: 'notes', x: 0, y: 2, w: 3, h: 2,minH:2 },
    { i: 'notes-form', x: 4, y: 2, w: 3, h: 2,minH:2 },
    { i: 'corona', x: 0, y: 3, w: 10, h: 2, minW: 10, maxH: 2 },
    { i: 'spotify', x: 0, y: 3, w: 10, h: 2, minW: 10, maxH: 2 },
    { i: 'quote', x: 4, y: 4, w: 2, h: 2, minW: 2, maxH: 3 },
    { i: 'gas', x: 4, y: 4, w: 2, h: 2, minW: 2, maxH: 3 },
  ]

  const [authLay, setAuthLay] = useState({
    mounted: false,
  })

  const [unAuth, setLayout] = useState({
    mounted: false,
    currentBreakpoint: 'lg',
  });

  const { mounted, currentBreakpoint, layouts } = unAuth;

  const ResponsiveReactGridLayout = WidthProvider(Responsive);

  useEffect(() => {
    if (localStorage.token) {
      console.log('getUser')
      authContext.loadUser();
    }
    setLayout({
      mounted: true,
      layouts: {
        lg: unAuthlayout,
        md: unAuthlayout,
        sm: unAuthlayoutMD

      }
    });

    setAuthLay({
      mounted: true,
      layouts: {
        lg: authLayout,
        md: authLayout,
        sm: authLayoutMD
      }
    })



    //eslint-disable-next-line
  }, []);

  const override = css`
      display: block;
      margin: 0 auto;
      border-color: white;
    `;

  let [color, setColor] = useState("#ffffff");
  //dt --> change Unix time stamp 

  const onWidthChange = (width, all) => {
    //console.log(width, 'current')


  }

  const onBreakpointChange = (all) => {
    //console.log(all, 'breakpoint');
  }


  const {getAllCustomers} = getCustomerContext
  const {selectedCustomer, selectCustomer} = selectedCustomerContext;
/*  useEffect(() => {
    getAllCustomers()
  },[]  )*/

  const {getRole} = getRoleByEmailContext
  console.log(getRole)

  const config = {
      headers: { "Content-Type": 'application/javascript' }
  };
  /*const onStockSearchSubmit = async (namePart) => {
    console.log("onSubmit " + namePart)
    setAuthToken(localStorage.token)
    try {
      const res = await axios.get(`${global.BACKEND_URL}/api/findStockByName?namePart=${namePart}`);


      console.log(res)
    }catch (e) {
      console.error(e)
    }
  }*/



  const unAuthLayoutContent = (
    <Fragment>
      {!mounted ? (
        <div className="spinner-placement">
          <BeatLoader color={color} css={override} size={20}></BeatLoader>
        </div>
      ) : (
        <ResponsiveReactGridLayout className="unAuthlayout" layouts={layouts} rowHeight={150} heigth={500} width={1200}
          breakpoints={{ lg: 1200, md: 1000, sm: 768, xs: 767, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          onLayoutChange={onWidthChange}
          onBreakpointChange={onBreakpointChange}
        >
          <div key="searchBox">
            <SearchBox></SearchBox>
          </div>

            <AktienDetails key="SearchedAktien"></AktienDetails >

          <div key="depot" className="wrapper-dash">
            <div className="depot-wrapper">
              <Depot></Depot>
            </div>
          </div>
          <div key="gas" className="wrapper-dash">
            <h2>Bank Volume</h2>
            <div className="depot-wrapper">
              <BankVolume></BankVolume>
            </div>
          </div>
        </ResponsiveReactGridLayout>

      )}

    </Fragment>
  )

  const [shares, setShares] = useState(0);
  const selectedStockContext = useContext(SelectedStockContext);
  const {selectedStock} = selectedStockContext
  const searchBoxContext = useContext(SearchBoxContext)
  const { stocks, loading } = searchBoxContext;

  console.log(selectedCustomer)

  const buyShares = async () => {
    setAuthToken(localStorage.token)

    try {
      const res = await axios.post(`${global.BACKEND_URL}/api/buyStock?symbol=${selectedStock.symbol}&shares=${shares}&depotId=${Number.parseInt(selectedCustomer.depotId)}`);

      selectCustomer(selectedCustomer)
      console.log(res)
      handleClose()
    }catch (e) {
      console.error(e)
    }

  }

  const authLayoutContet = (
    <Fragment>
      <div>
        <Button onClick={handleClick}>Open modal</Button>
        <Modal
            open={open}

            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
          <Box sx={style} component="form" autoComplete="off">
            <Typography id="modal-modal-title" variant="h6" component="h4">
              <h4 >{`Buying Share: ${selectedStock?.companyName}`}</h4>
              <h5 >{`For Customer: ${selectedCustomer?.firstName} ${selectedCustomer?.lastName}`}</h5>
              <br/>
              <TextField
                  error={shares === ""}
                  required
                  value={shares}
                  id="outlined-required"
                  sx={{input: {color: 'black'} }}
                  label="Number of Shares"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    setShares(Math.min(Math.max(e.target.value, 0), 999999999));}}
              />
              <Button disabled={shares === 0} onClick={buyShares}>Buy Shares</Button>
              <Button onClick={handleClose}>Abort</Button>
            </Typography>


          </Box>
        </Modal>
      </div>
      {!mounted ? (
        <div className="spinner-placement">
          <BeatLoader color={color} css={override} size={20}></BeatLoader>
        </div>
      ) : (
        <ResponsiveReactGridLayout className="unAuthlayout" layouts={authLay.layouts} rowHeight={150} heigth={500} width={1200}
          breakpoints={{ lg: 1200, md: 1000, sm: 768, xs: 767, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          onLayoutChange={onWidthChange}
          onBreakpointChange={onBreakpointChange}
        >
          <div key="weatherSmall">
            <SearchBox></SearchBox>
          </div>
          <div key="SearchedAktien">
            <AktienDetails></AktienDetails>
          </div>

          <div key="corona" className="wrapper-dash">
            {selectedCustomer === undefined
                ? <h2>No Customer Selected</h2>
                : <Fragment>
                  <h2>{`${selectedCustomer.firstName} ${selectedCustomer.lastName}'s Depot, Id ${selectedCustomer.id}` }</h2>
                  <div className="depot-wrapper">
                    <Depot depot={selectedCustomer.depot}></Depot>
                  </div>
                </Fragment>
            }


          </div>
          <div key="spotify" className="wrapper-dash">
            <h2>Buy Shares</h2>
            {selectedCustomer === undefined
                ? <h2>No Customer Selected</h2>
                :
                <Fragment>
                  { stocks === undefined
                      ? <h2>Please search for stocks</h2>
                      :  <div className="depot-wrapper">
                            <ClickableStockTable stocks={stocks}></ClickableStockTable>
                            <BuySharesButton handleClick={handleClick}/>
                         </div>
                  }
                </Fragment>
            }

          </div>
          <div key="gas" className="wrapper-dash">
            <h2>Bank Volume</h2>
            <div className="depot-wrapper">
              <BankVolume></BankVolume>
            </div>
          </div>
        </ResponsiveReactGridLayout>

      )}
    </Fragment>
  )


  return (
    <Fragment>
      <div>

        {isAuthenticated ? authLayoutContet : unAuthLayoutContent}

      </div>
    </Fragment>
  )
}

export default Home