import React from "react";
import PropTypes from "prop-types";
import axios from 'axios'
import { baseurl } from "ApiBase.jsx";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "assets/jss/views/dashboardStyle.jsx";
import Snackbar from 'components/Snackbar.jsx';

class UserManamgent extends React.Component {
  constructor(props) {
    super(props);  
    this.state = {
      message:'',
      snackopen:false


    }
    this.handleInputChange = this.handleInputChange.bind(this);
   };

   handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    var bodyFormData = new FormData();
    bodyFormData.set('email', this.state.email);
    // alert({baseurl}.baseurl)
    axios({
      method: 'post',
      baseURL:{baseurl}.baseurl,
      url: '/user/login_user/',
      data: bodyFormData,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
      })
      .then((response) => {
   
         })
      .catch(function (response) {
   
      });
  }

  render() {
    const { classes } = this.props;
    setTimeout(() => {
      this.setState({
        message:'',
        snackopen:false
       });
    }, 5000);

    return (
      <div>
        {/* <GridContainer>

        </GridContainer> */}
        <Snackbar open={this.state.snackopen} messagecontent={this.state.message}></Snackbar>
       </div>
    );
  }
}

UserManamgent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(UserManamgent);
