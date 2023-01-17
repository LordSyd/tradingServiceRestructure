import './App.css';
import BurgerMenu from './components/layout/BurgerMenu';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import React, {Fragment, useContext, useEffect, useState} from 'react'
import setAuthToken from './utils/setAuthToken';
import Header from './components/layout/Header';
import PrivateRoute from './components/routing/PrivateRoute';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

/* theme options*/
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { GlobalStyles } from './components/theme/global';
import { lightTheme, darkTheme } from './components/theme/theme';

import Alert from './components/layout/Alerts'

//*import pages below *//
import Register from './components/register/Register';
import Login from './components/login/Login';
import About from './components/pages/About'
import Home from './components/pages/Home';
import './globals'
//*import states below*//
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import SearchShareState from './context/searchShare/searchShareState';
import BankVolumeState from './context/bankVolume/bankVolumeState';
import GetCustomerState from "./context/getCustomer/getCustomerState";
import SelectedCustomerState from "./context/selectedCustomer/selectedCustomerState";
import SelectedStockState from "./context/selectedStock/SelectedStockState";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import AuthContext from "./context/auth/authContext";


const App = () => {
  const [theme, setTheme] = useState('dark');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  useEffect( () => {
    /*localStorage.removeItem('token')*/

  }, []);


  const darkThemeMUI = createTheme({
    palette: {
      mode: 'dark',
    },
  });



  return (
    <AuthState>
      <ThemeProvider theme={darkThemeMUI}>
        <CssBaseline />
          <SelectedStockState>
        <SelectedCustomerState>
          <GetCustomerState>
            <SearchShareState>
                  <BankVolumeState>
                    <Router>
                      <AlertState>
                        <Fragment>

                          <BurgerMenu></BurgerMenu>
                          <Header themeSelected={theme}>
                          </Header>
                          <div className="container">
                            <Alert></Alert>
                            <Switch>
                              <PrivateRoute exact path="/" component={Home} />
                              <Route exact path='/' component={Home}></Route>
                              <Route exact path='/about' component={About}></Route>
                              <Route exact path='/login' component={Login}></Route>
                              <Route exact path='/register' component={Register}></Route>
                            </Switch>
                          </div>
                        </Fragment>
                      </AlertState>
                    </Router>
                  </BankVolumeState>
            </SearchShareState>
          </GetCustomerState>
        </SelectedCustomerState>
          </SelectedStockState>
      </ThemeProvider>
    </AuthState>

  );
};

export default App;
