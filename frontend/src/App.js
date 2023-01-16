import './App.css';
import BurgerMenu from './components/layout/BurgerMenu';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, {Fragment, useEffect, useState} from 'react'
import setAuthToken from './utils/setAuthToken';
import Header from './components/layout/Header';
import PrivateRoute from './components/routing/PrivateRoute';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

/* theme options*/
import { ThemeProvider } from 'styled-components';
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

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const [theme, setTheme] = useState('dark');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  useEffect( () => {
    /*localStorage.removeItem('token')*/

  }, []);

  return (
    <AuthState>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
          <SelectedStockState>
        <SelectedCustomerState>
          <GetCustomerState>
            <SearchShareState>
                  <BankVolumeState>
                    <Router>
                      <AlertState>
                        <Fragment>
                          <div className="btn switch-theme btn-dark" onClick={themeToggler}> Switch Theme</div>
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
