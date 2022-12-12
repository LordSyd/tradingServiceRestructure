  import React, { Fragment} from 'react';

  import mainLogoBlack from "../../res/img/logo_transparent.png";
  import mainLogoWhite from "../../res/img/Trading_White.jpg";


const Header = (props) => {

  const {themeSelected} = props;
   return (
      <Fragment>
  
          <div className="navbar">
             {themeSelected == "light" ?(
               <div className="MainLogo">
                   <img src={mainLogoBlack} alt="firespot" />
               </div>
               
             ):(
               <div className="MainLogoWhite">
                   <img src={mainLogoBlack} alt="firespot" />
               </div>
             )}
          
          </div>
      </Fragment>
  )
};

export default Header;