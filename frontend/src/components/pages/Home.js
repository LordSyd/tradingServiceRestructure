import React, { useContext, useEffect, Fragment, useReducer, useState } from 'react'

import GridLayout from 'react-grid-layout';
import SearchBox from '../searchBox/SearchBox';
import CustomerDetails from '../customer/customerDetails';
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
import SearchShareContext from "../../context/searchShare/searchShareContext";
import ClickableStockTable from "../depotTable/ClickableStockTable";
import bankVolumeContext from "../../context/bankVolume/bankVolumeContext";
import BankVolumeContext from "../../context/bankVolume/bankVolumeContext";
import {Container, useTheme} from "@mui/system";
import Grid from '@mui/material/Grid'; // Grid version 1
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import Drawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

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



/*const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));*/


const Home = (props) => {
  const [authLay, setAuthLay] = useState({
    mounted: false,
  })

  const { mounted, currentBreakpoint, layouts } = authLay;
  const Item = styled(Paper)(({ theme }) => {

    console.log("theme")
    console.log(theme)

    return ({
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',

    })
  })

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
  const { isAuthenticated, user, loadUser} = authContext;
  const getCustomerContext = useContext(GetCustomerContext)
  const selectedCustomerContext = useContext(SelectedCustomerContext);

  const {customers} = getCustomerContext
  const {selectedCustomer, selectCustomer} = selectedCustomerContext;

  const [buySharesNumber, setBuySharesNumber] = useState(0);
  const [sellSharesNumber, setSellSharesNumber] = useState(0);
  const selectedStockContext = useContext(SelectedStockContext);
  const {buyStockSelected,sellStockSelected} = selectedStockContext
  const searchShareContext = useContext(SearchShareContext)
  const { stocks } = searchShareContext;
  const [openBuyModal, setOpenBuyModal] = React.useState(false);
  const [openSellModal, setOpenSellModal] = React.useState(false);

  useEffect(() => {
    if (user) {
      setAuthLay({
        mounted: true,
        layouts: {
          lg: authLayout,
          md: authLayout,
          sm: authLayoutMD
        }
      });
    }
  }, [user])

  useEffect(() => {

    const loadUserAsync = async () => {
      console.log('getUser')
      await loadUser();
      getVolume()
    }

    if (!user) {
      console.log("pushback")
      loadUserAsync();
    }
    if (!localStorage.token || isAuthenticated == false) {
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






  const ResponsiveReactGridLayout = WidthProvider(Responsive);



  const override = css`
      display: block;
      margin: 0 auto;
      border-color: white;
    `;

  let [color, setColor] = useState("#ffffff");
  //dt --> change Unix time stamp 




  const config = {
      headers: { "Content-Type": 'application/javascript' }
  };









  console.log(selectedCustomer)
  const bnkVolumeContext = useContext(bankVolumeContext);
  const { getVolume, bankVolume } = bnkVolumeContext;

  const handleModalChange = (event ) => {
      event.preventDefault()
      setBuySharesNumber(Math.min(Math.max(event.target.value, 0), 999999999))
  }

  useEffect(() => {

  }, [])


  const handleClickSell = () => {

    setOpenSellModal(true);
  }

  const lowerPadding = {paddingBottom: "10px"}

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
                error={buySharesNumber == ""}
                required
                value={buySharesNumber}
                id="outlined-required"
                sx={{input: {color: theme.palette.text.primary} }}
                label="Number of Shares"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleModalChange}
            />
            <Button disabled={buySharesNumber == 0} onClick={buyShares}>Buy Shares</Button>
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
                error={sellSharesNumber == ""}
                required
                value={sellSharesNumber}
                id="outlined-required"
                sx={{input: {color: theme.palette.text.primary} }}
                label="Number of Shares"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  e.preventDefault()
                  setSellSharesNumber(Math.min(Math.max(e.target.value, 0), sellStockSelected?.quantity));}}
            />
            <Button disabled={sellSharesNumber == 0} onClick={sellShares}>Sell Shares</Button>
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

            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={0} >

                <Grid sx={{pb: 2}} xs={12}>
                  <Item>
                    <Fragment>
                      <h2>{`${user.firstName} ${user.lastName}'s Depot, Id ${user.id} Total Value: ${selectedCustomer.depotValue} €` }</h2>
                      <div className="depot-wrapper">
                        <Depot depot={selectedCustomer?.depot} onClickSell={handleClickSell}></Depot>
                      </div>
                    </Fragment>
                  </Item>
                </Grid>
                <Grid sx={{pb: 2}} xs={12}>
                  <Grid  >
                    <Item ><SearchBox  customer={true}></SearchBox></Item>
                  </Grid>

                </Grid>
                <Grid xs={12}>
                  <Item>
                    <h2>Buy Shares</h2>

                    <Fragment>
                      { stocks == undefined
                          ? <h2>Please search for stocks</h2>
                          :  <Fragment className="depot-wrapper">
                            <ClickableStockTable stocks={stocks}></ClickableStockTable>
                            <BuySharesButton handleClick={handleClick}/>
                          </Fragment>
                      }
                    </Fragment>
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </Fragment>

      )}
    </Fragment>)
  }


  const theme = useTheme();
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
                  error={buySharesNumber == ""}
                  required
                  value={buySharesNumber}
                  id="outlined-required"
                  sx={{input: {color: theme.palette.text.primary} }}
                  label="Number of Shares"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleModalChange}
              />
              <Button disabled={buySharesNumber == 0} onClick={buyShares}>Buy Shares</Button>
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
                  error={sellSharesNumber == ""}
                  required
                  value={sellSharesNumber}
                  id="outlined-required"
                  sx={{input: {color: theme.palette.text.primary} }}
                  label="Number of Shares"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    e.preventDefault()
                    setSellSharesNumber(Math.min(Math.max(e.target.value, 0), sellStockSelected.quantity));}}
              />
              <Button disabled={sellSharesNumber == 0} onClick={sellShares}>Sell Shares</Button>
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
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={0}>
              <Grid sx={{pb: 2}}  xs={3}>
                <Item> <SearchBox></SearchBox></Item>
              </Grid>
              <Grid sx={{pb: 2}}  xs={9}>
                <Item sx={{mb: 2}}  > {customers
                    ? <CustomerDetails></CustomerDetails>
                    : <h2>Please Search for customers</h2>
                }</Item>
                <Item sx={{mb: 2}}>
                  <div key="corona" className="wrapper-dash">
                    {selectedCustomer == undefined
                        ? <h2>No Customer Selected</h2>
                        : <Fragment>
                          <h2>{`${selectedCustomer?.firstName} ${selectedCustomer?.lastName}'s Depot, Id ${selectedCustomer?.id} Total Value: ${selectedCustomer.depotValue} €` }</h2>
                          <div className="depot-wrapper">
                            <Depot depot={selectedCustomer?.depot} onClickSell={handleClickSell}></Depot>
                          </div>
                        </Fragment>
                    }
                  </div>
                </Item>
                <Item>
                  <div key="spotify" className="wrapper-dash">
                    <h2>Buy Shares</h2>
                    {selectedCustomer == undefined
                        ? <h2>No Customer Selected</h2>
                        :
                        <Fragment>
                          { stocks == undefined
                              ? <h2>Please search for stocks</h2>
                              :  <div className="depot-wrapper">
                                <ClickableStockTable stocks={stocks}></ClickableStockTable>
                                <BuySharesButton handleClick={handleClick}/>
                              </div>
                          }
                        </Fragment>
                    }
                  </div>
                </Item>
              </Grid>


            </Grid>
          </Box>

          <Fragment>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={0}>

              </Grid>
            </Box>
          </Fragment>


          <Fragment>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={0}>
                <Grid xs={12}>

                </Grid>
              </Grid>
            </Box>
          </Fragment>

          <Fragment>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={0}>
                <Grid xs={12}>
                  <Item>

            <h2>Bank Volume</h2>
            <div className="depot-wrapper">
              <BankVolume></BankVolume>
            </div>

                  </Item>
                </Grid>
              </Grid>
            </Box>
          </Fragment>
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