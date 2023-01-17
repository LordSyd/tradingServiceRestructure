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
import bankVolumeContext from "../../context/bankVolume/bankVolumeContext";
import BankVolumeContext from "../../context/bankVolume/bankVolumeContext";
import getRoleByEmailContext from "../../context/getRoleByEmail/getRoleByEmailContext";
import {Container} from "@mui/system";
import {Grid} from "@mui/material";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Home = (props) => {

  const buyShares = async () => {
    setAuthToken(localStorage.token)

    try {
      const res = await axios.post(`${global.BACKEND_URL}/api/buyStock?symbol=${buyStockSelected.symbol}&shares=${buySharesNumber}&depotId=${Number.parseInt(selectedCustomer.depotId)}`);

      selectCustomer(selectedCustomer)
      getVolume();
      console.log(res)
      handleBuyModalClose()
    }catch (e) {
      console.error(e)
    }

  }

  const sellShares = async () => {
    setAuthToken(localStorage.token)

    try {
      const res = await axios.post(`${global.BACKEND_URL}/api/sellStock?symbol=${sellStockSelected.symbol}&shares=${sellSharesNumber}&depotId=${Number.parseInt(selectedCustomer.depotId)}`);

      selectCustomer(selectedCustomer)
      getVolume();
      console.log(res)
      handleSellModalClose()
    }catch (e) {
      console.error(e)
    }

  }
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user, loadUser, loading, email} = authContext;
  const getCustomerContext = useContext(GetCustomerContext)
  const selectedCustomerContext = useContext(SelectedCustomerContext);

  const {customers} = getCustomerContext
  const {selectedCustomer, selectCustomer} = selectedCustomerContext;

  const [buySharesNumber, setBuySharesNumber] = useState(0);
  const [sellSharesNumber, setSellSharesNumber] = useState(0);
  const selectedStockContext = useContext(SelectedStockContext);
  const {buyStockSelected,sellStockSelected} = selectedStockContext
  const searchBoxContext = useContext(SearchBoxContext)
  const { stocks } = searchBoxContext;
  const [openBuyModal, setOpenBuyModal] = React.useState(false);
  const [openSellModal, setOpenSellModal] = React.useState(false);

  const [authLay, setAuthLay] = useState({
    mounted: false,
  })

  useEffect(() => {

    const loadUserAsync = async () => {
      console.log('getUser')
      await loadUser();
      setAuthLay({
        mounted: true,
        layouts: {
          lg: authLayout,
          md: authLayout,
          sm: authLayoutMD
        }
      });
    }

    if (!user) {
      console.log("pushback")
      loadUserAsync();
    }
    if (!localStorage.token || isAuthenticated === false) {
      console.log("pushback")
      props.history.push('/login');
    }









    //eslint-disable-next-line
  }, []);

  const handleBuyModalClose = () => {
    setOpenBuyModal(false)
  };
  const handleSellModalClose = () => {
    setOpenSellModal(false)
  };


  const handleClick = (e) => {
    e.preventDefault()
    setOpenBuyModal(true)
  };



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



  /*const [unAuth, setLayout] = useState({
    mounted: false,
    currentBreakpoint: 'lg',
  });*/

  /*const { mounted, currentBreakpoint, layouts } = unAuth;*/
  const { mounted, currentBreakpoint, layouts } = authLay;

  const ResponsiveReactGridLayout = WidthProvider(Responsive);



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








  console.log(selectedCustomer)
  const bnkVolumeContext = useContext(bankVolumeContext);
  const { getVolume, bankVolume } = bnkVolumeContext;

  const handleModalChange = (event ) => {
      event.preventDefault()
      setBuySharesNumber(Math.min(Math.max(event.target.value, 0), 999999999))
  }

  useEffect(() => {
    getVolume()
  }, [bankVolume])


  const handleClickSell = () => {

    setOpenSellModal(true);
  }


  const unAuthLayoutContent =  () => {
    if (!selectedCustomer) {
      selectCustomer(user)
    }

    return(<Fragment>
      <Modal
          open={openBuyModal}

          aria-labelledby="buy-modal-title"
          aria-describedby="buy-modal-description"
      >
        <Box sx={style} component="form" autoComplete="off">
          <Typography id="buy-modal-title" variant="h6" component="h4">
            <h4 >{`Buying Share: ${buyStockSelected?.companyName}`}</h4>
            <br/>
            <TextField
                error={buySharesNumber === ""}
                required
                value={buySharesNumber}
                id="outlined-required"
                sx={{input: {color: 'black'} }}
                label="Number of Shares"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleModalChange}
            />
            <Button disabled={buySharesNumber === 0} onClick={buyShares}>Buy Shares</Button>
            <Button onClick={handleBuyModalClose}>Abort</Button>
          </Typography>


        </Box>
      </Modal>
      <Modal
          open={openSellModal}

          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" autoComplete="off">
          <Typography id="modal-modal-title" variant="h6" component="h4">
            <h4 >{`Selling Share: ${sellStockSelected?.companyName}`}</h4>
            <br/>
            <TextField
                error={sellSharesNumber === ""}
                required
                value={sellSharesNumber}
                id="outlined-required"
                sx={{input: {color: 'black'} }}
                label="Number of Shares"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  e.preventDefault()
                  setSellSharesNumber(Math.min(Math.max(e.target.value, 0), sellStockSelected.quantity));}}
            />
            <Button disabled={sellSharesNumber === 0} onClick={sellShares}>Sell Shares</Button>
            <Button onClick={handleSellModalClose}>Abort</Button>
          </Typography>


        </Box>
      </Modal>
      {!mounted || !selectedCustomer ? (
          <div className="spinner-placement">
            <BeatLoader color={color} css={override} size={20}></BeatLoader>
          </div>
      ) : (

          <Fragment
          >
            <div key="weatherSmall">
              <SearchBox customer={true}></SearchBox>
            </div>

            <div key="spotify" className="wrapper-dash">
              <h2>Buy Shares</h2>

              <Fragment>
                { stocks === undefined
                    ? <h2>Please search for stocks</h2>
                    :  <div className="depot-wrapper">
                      <ClickableStockTable stocks={stocks}></ClickableStockTable>
                      <BuySharesButton handleClick={handleClick}/>
                    </div>
                }
              </Fragment>


            </div>

            <div key="corona" className="wrapper-dash">

              <Fragment>
                <h2>{`${user.firstName} ${user.lastName}'s Depot, Id ${user.id}` }</h2>
                <div className="depot-wrapper">
                  <Depot depot={selectedCustomer.depot} onClickSell={handleClickSell}></Depot>
                </div>
              </Fragment>



            </div>

            <div key="gas" className="wrapper-dash">
              <h2>Bank Volume</h2>
              <div className="depot-wrapper">
                <BankVolume></BankVolume>
              </div>
            </div>
          </Fragment>

      )}
    </Fragment>)
  }



  const authLayoutContent = (
    <Fragment>
        <Modal
            open={openBuyModal}

            aria-labelledby="buy-modal-title"
            aria-describedby="buy-modal-description"
        >
          <Box sx={style} component="form" autoComplete="off">
            <Typography id="buy-modal-title" variant="h6" component="h4">
              <h4 >{`Buying Share: ${buyStockSelected?.companyName}`}</h4>
              <h5 >{`For Customer: ${selectedCustomer?.firstName} ${selectedCustomer?.lastName}`}</h5>
              <br/>
              <TextField
                  error={buySharesNumber === ""}
                  required
                  value={buySharesNumber}
                  id="outlined-required"
                  sx={{input: {color: 'black'} }}
                  label="Number of Shares"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleModalChange}
              />
              <Button disabled={buySharesNumber === 0} onClick={buyShares}>Buy Shares</Button>
              <Button onClick={handleBuyModalClose}>Abort</Button>
            </Typography>


          </Box>
        </Modal>
        <Modal
            open={openSellModal}

            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
          <Box sx={style} component="form" autoComplete="off">
            <Typography id="modal-modal-title" variant="h6" component="h4">
              <h4 >{`Selling Share: ${sellStockSelected?.companyName}`}</h4>
              <h5 >{`For Customer: ${selectedCustomer?.firstName} ${selectedCustomer?.lastName}`}</h5>
              <br/>
              <TextField
                  error={sellSharesNumber === ""}
                  required
                  value={sellSharesNumber}
                  id="outlined-required"
                  sx={{input: {color: 'black'} }}
                  label="Number of Shares"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    e.preventDefault()
                    setSellSharesNumber(Math.min(Math.max(e.target.value, 0), sellStockSelected.quantity));}}
              />
              <Button disabled={sellSharesNumber === 0} onClick={sellShares}>Sell Shares</Button>
              <Button onClick={handleSellModalClose}>Abort</Button>
            </Typography>


          </Box>
        </Modal>
      {!mounted ? (
        <div className="spinner-placement">
          <BeatLoader color={color} css={override} size={20}></BeatLoader>
        </div>
      ) : (
        <Fragment>
         {/* <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid xs={8}>
                <Item>xs=8</Item>
              </Grid>
              <Grid xs={4}>
                <Item>xs=4</Item>
              </Grid>
              <Grid xs={4}>
                <Item>xs=4</Item>
              </Grid>
              <Grid xs={8}>
                <Item>xs=8</Item>
              </Grid>
            </Grid>
          </Box>*/}
          <div key="weatherSmall">
            <SearchBox></SearchBox>
          </div>
          <div key="SearchedAktien">
            {customers
                ? <AktienDetails></AktienDetails>
                : <h2>Please Search for customers</h2>
            }

          </div>

          <div key="corona" className="wrapper-dash">
            {selectedCustomer === undefined
                ? <h2>No Customer Selected</h2>
                : <Fragment>
                  <h2>{`${selectedCustomer.firstName} ${selectedCustomer.lastName}'s Depot, Id ${selectedCustomer.id}` }</h2>
                  <div className="depot-wrapper">
                    <Depot depot={selectedCustomer.depot} onClickSell={handleClickSell}></Depot>
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
        </Fragment>

      )}
    </Fragment>
  )


  return (
    <Fragment>
      <div>

        {!user
            ? <div className="spinner-placement">
                <BeatLoader color={color} css={override} size={20}></BeatLoader>
              </div>

            : user.userRole === "EMPLOYEE" ? authLayoutContent : unAuthLayoutContent()}

      </div>
    </Fragment>
  )
}

export default Home