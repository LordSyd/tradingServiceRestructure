import React, {Fragment, useContext, useEffect} from 'react'
import PropTypes from 'prop-types';
import {Link as RouterLink } from 'react-router-dom'
import  Link from '@mui/material/Link';
import { slide as Menu } from 'react-burger-menu'
import AuthContext from '../../context/auth/authContext'
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import {useTheme} from "@mui/system";
import {styled} from "@mui/material/styles";


 const BurgerMenu = ({title, icon}) => {
    const authContext = useContext(AuthContext);


    const {isAuthenticated, logout, user,loadUser} = authContext;
     console.log("user")
    console.log(user)
    const logOut = () =>{
        logout();
    }
    useEffect(()=>{
        /*loadUser();*/
        // eslint-disable-next-line
    },[])


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
     const theme = useTheme();



     const list = (anchor) => (
         <Box
             sx={{width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250}}
             role="presentation"
             onClick={toggleDrawer(anchor, false)}
             onKeyDown={toggleDrawer(anchor, false)}
         >
             <List>
                 <Fragment>


                     <List>  </List>
                     <ListItem>
                         Hey, {user?.firstName }
                     </ListItem>
                     <List>
                     <ListItem>
                         <Link to={'/'} component={RouterLink} variant="button" color={theme.palette.text.primary}>
                             <i className="fas fa-home"></i>{' '}
                             Home
                         </Link>
                     </ListItem>
                     </List>
                     <List>
                         <ListItem>
                             <Link component={RouterLink}  color={theme.palette.text.primary} to="/about">
                                 <i className="fas fa-users"></i>{' '}
                                 About
                             </Link>
                         </ListItem>
                     </List>
                     <List>
                         <ListItem>
                             <Link color={theme.palette.text.primary}  onClick={logOut} href="#!">
                                 <i className='fas fa-sign-out-alt' /> {' '}
                                 Logout
                             </Link>
                         </ListItem>
                     </List>

                 </Fragment>
             </List>
             <Divider/>

         </Box>
     );
    return (

        <Fragment>
            { isAuthenticated
                ?   <Fragment>
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
                :<Fragment/>
            }
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
