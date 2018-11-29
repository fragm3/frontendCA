import {
   container
} from "assets/jss/material-dashboard-react.jsx";
import image from "assets/img/background.jpeg"
import logo from "assets/img/CareerAnna_black.png"

const appStyle = theme => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh",
    // backgroundImage: "url("+ {image}+")"
    backgroundImage: "url(" + image + ")" ,
    backgroundRepeat: "no-repeat", 
    // backgroundSize:["100%", "100%"],
    backgroundSize: "cover",
  },
  content: {
    marginTop: "70px",
    padding: "30px 15px",
    minHeight: "calc(100vh - 123px)"
  },
  container,
  inputBox:{
    width: 320,
    height: 450,
    position: "absolute",
    top:0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    // backgroundColor:"#EAEAEA",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width:"100%",
  },
  containerFormOverall:{
    // width:"100%",
    // padding:10
  },

  containerForm:{
      display: 'flex',
      flexWrap: 'wrap',
      padding:5
  },
  logoContainer:{
    height:100,
    backgroundImage: "url(" + logo + ")" ,
    backgroundRepeat: "no-repeat", 
    backgroundPosition: "center"
  },
  logoImg:{
    // position:"absolute",
    // marginLeft:"auto",
    // marginRight:"auto"
    align:"middle"

  },
  buttonSubmit:{
    width:"100%",
    
  },
  buttonForgot:{
    width:"100%"
    // float:"right"
    // display: "flex",
    // flexDirection: "row-reverse",
    // alignItems:"flex-end"
  },
  buttonMagic:{
    width:"100%",
  },
  orButton:{
    width:"100%",
    textAlign:"center"
  }



});

export default appStyle;
