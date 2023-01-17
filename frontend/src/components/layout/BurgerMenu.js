import React, {Fragment, useContext, useEffect} from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import { slide as Menu } from 'react-burger-menu'
import AuthContext from '../../context/auth/authContext'
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";


 const BurgerMenu = ({title, icon}) => {
    const authContext = useContext(AuthContext);


    const {isAuthenticated, logout, user,loadUser} = authContext;

    const logOut = () =>{
        logout();
    }
    useEffect(()=>{
        /*loadUser();*/
        // eslint-disable-next-line
    },[])

  

    const authLinks = (
        <Fragment>
            <li> Hey, {user && user.name} </li>
            <li>
                <Link to='/'>
                    <i className="fas fa-home"></i>{' '}
                    Home
                </Link>
            </li>
            <li>
                <Link to="/about">
                <i className="fas fa-users"></i>{' '}
                About
                </Link>
            </li>
{/*            <li>
                <Link to="/notes">
                <i className="far fa-sticky-note"></i>{' '}
                Notes
                </Link>
            </li>*/}
            <li>
                <a onClick={logOut} href="#!">
                    <i className='fas fa-sign-out-alt' /> {' '}
                  Logout
                </a>
            </li>
        </Fragment>
    );

    const unauthLinks = (
        <Fragment>
            <li>
                <Link to='/'>
                <i className="fas fa-home"></i>{' '}
                Home</Link>
            </li>
            <li>
                <Link to="/about">
                <i className="fas fa-users"></i>{' '}
                About</Link>
            </li>
            <li>
                <Link to="/login">
                <i className="fas fa-sign-in-alt"></i>{' '}
                Login</Link>
            </li>
        </Fragment>
    );
     const [state, setState] = React.useState({
         top: false,
         left: false,
         bottom: false,
         right: false,
     });

     const toggleDrawer = (anchor, open) => (event) => {
         if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
             return;
         }

         setState({...state, [anchor]: open});
     };

     const list = (anchor) => (
         <Box
             sx={{width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250}}
             role="presentation"
             onClick={toggleDrawer(anchor, false)}
             onKeyDown={toggleDrawer(anchor, false)}
         >
             <List>
                 <Fragment>
                     <li> Hey, {user && user.name} </li>
                     <li>
                         <Link to='/'>
                             <i className="fas fa-home"></i>{' '}
                             Home
                         </Link>
                     </li>
                     <li>
                         <Link to="/about">
                             <i className="fas fa-users"></i>{' '}
                             About
                         </Link>
                     </li>
                     {/*            <li>
                <Link to="/notes">
                <i className="far fa-sticky-note"></i>{' '}
                Notes
                </Link>
            </li>*/}
                     <li>
                         <a onClick={logOut} href="#!">
                             <i className='fas fa-sign-out-alt' /> {' '}
                             Logout
                         </a>
                     </li>
                 </Fragment>
                 );
             </List>
             <Divider/>

         </Box>
     );
    return (

        <Fragment>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>Menu</Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>

                </React.Fragment>
            ))}
        </Fragment>
 
    )
}
BurgerMenu.propTypes ={
    title:PropTypes.string.isRequired,
    icon: PropTypes. string
}

BurgerMenu.defaultProps = {
    title: 'TradingService',
    icon: 'fas fa-id-card-alt'
}

export default BurgerMenu
