  import React, { Fragment} from 'react';

  import mainLogoBlack from "../../res/img/logo_transparent.png";


  const Header = (props) => {

  const {themeSelected} = props;
   return (
      <Fragment>
  
          <div style={{
              "display": "flex",
              "justifyContent": "center"
          }}>
             {themeSelected == "light" ?(

                   <img  style={{

                       marginLeft: "auto",
                       marginRight: "auto",
                       width: "50%"
                   }} src={mainLogoBlack} alt="firespot" />
               
             ):(

                   <img  style={{

                       marginLeft: "auto",
                       marginRight: "auto",
                       width: "25%"
                   }} src={mainLogoBlack} alt="firespot" />

             )}
          
          </div>
      </Fragment>
  )
};

export default Header;