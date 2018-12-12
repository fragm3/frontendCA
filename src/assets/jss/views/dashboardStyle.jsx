import { successColor } from "assets/jss/material-dashboard-react.jsx";

const dashboardStyle  = theme => ({
  successText: {
    color: successColor
  },
  upArrowCardCategory: {
    width: "16px",
    height: "16px"
  },
  stats: {
    color: "#999999",
    display: "inline-flex",
    fontSize: "12px",
    lineHeight: "22px",
    "& svg": {
      top: "4px",
      width: "16px",
      height: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      top: "4px",
      fontSize: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px"
    }
  },
  cardCategory: {
    color: "#999999",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    paddingTop: "10px",
    marginBottom: "0"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitle: {
    color: "#3C4858",
    marginTop: "3px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  settingsbutton:{
    width:"100%"
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    display: 'flex',
    flexWrap: 'wrap',

  },
  table: {
    minWidth: 700,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  tableHeader:{
    background: "rgba(224, 224, 224, 1)"
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
    backgroundColor: "#9c27b0",
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  // dropdownlabel:{
  //   marginTop:16
  // },
  dropdownselect:{
    marginBottom:"8px !important",
    width:150
  },
  filterIcon:{
    margin:"8px! important",
    height:"56px! important",
    lineHeight:"56px! important",
  },
  textField:{
    marginTop:0,
    width:150
  },
  buttonicon:{
    cursor:"pointer"
  },
  fullwidth:{
    width:"100%"
  },
  floatingButton:{
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
  modalDesignUser:{
    // backgroundColor:"white"
    top: "20%",
    left: "30%",
    width:"40%",
    // padding:10
  },
  modalpaddingpaper:{
    padding:20
  },
  radiohorizontal:{
    flexDirection:"row"
  },
  lastchild :{
    width:100  /* styles */
  },
  foldergrid:{
    padding:5
  },
  folderstyle:{
    // padding: 15,
    borderRadius: "10px",
    cursor:"pointer",
    marginTop:10,
    marginBottom:10,
    "& :hover":{
      background:"#E7F0FE",
      borderRadius: "10px",
     },
     "& :hover foldername":{
      color:"#1867D2"
    }
 
  },


  folderdiv:{
    display:"flex",
    padding: "15px"
    },
  foldericoncontainer:{

  },
  foldericon:{
    lineHeight:"30px",
    color:"#8f8f8f"
  },
  foldername:{
    padding:"0px 10px",
    lineHeight:"30px",
    fontWeight:500,
    color:"#5f5f5f",
    "text-overflow": "ellipsis",
    "overflow": "hidden",
    "white-space": "nowrap",
    "& :hover":{
      color:"#1867D2 !important"
    }

  },

  
  '@media only screen and (max-width: 767px)' :{
    modalDesignUser:{
      // backgroundColor:"white"
      top: "20%",
      left: "5%",
      width:"90%",
      // padding:10
    },  
    
    /* phones */


  },
  '@media only screen and (min-width: 767px)' :{
    tableContainer:{
      width:"100%"
    },    
  }
  
});

export default dashboardStyle;

