  import React, { Fragment} from 'react';

  import mainLogoBlack from "../../res/img/logo_transparent.png";
  import mainLogoWhite from "../../res/img/Trading_White.jpg";


const Header = (props) => {

  const {themeSelected} = props;
   return (
      <Fragment>
  
          <div className="navbar">
             {themeSelected == "light" ?(

                   <img  style={{

                       marginLeft: "auto",
                       marginRight: "auto",
                       width: "50%"
                   }} src={mainLogoBlack} alt="firespot" />
               
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