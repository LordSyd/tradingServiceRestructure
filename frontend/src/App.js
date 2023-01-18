import './App.css';
import BurgerMenu from './components/layout/BurgerMenu';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import React, {Fragment, useState} from 'react'
import Header from './components/layout/Header';
import PrivateRoute from './components/routing/PrivateRoute';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

/* theme options*/
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


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



const App = () => {
  const [theme, setTheme] = useState('dark');

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
