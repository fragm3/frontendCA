/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import ReactDOM from 'react-dom';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import loginStyle from "assets/jss/layouts/LoginStyle.jsx";
import Card from "components/Card/Card.jsx"
import Button from "components/Button.jsx"
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { baseurl } from "ApiBase.jsx";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
       email: '',
       emailpass:''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.clearInput = this.clearInput.bind(this);
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
    alert('Your email: ' + this.state.email + 'Your password: ' + this.state.emailpass);
    event.preventDefault();
    

  }

  
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>      
        <Card className={classes.inputBox} ref="mainPanel">
          <div className={classes.logoContainer}>
          </div>
          <div className={classes.containerFormOverall}>
            <form className={classes.containerForm} noValidate autoComplete="off">
            <TextField
                id="emailInput"
                label="Email"
                className={classes.textField}
                type="email"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
                value = {this.state.email}
                onChange={this.handleInputChange}
              />
              <TextField
                id="passwordInput"
                label="Password"
                className={classes.textField}
                type="password"
                name="emailpass"
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
                value = {this.state.emailpass}
                onChange={this.handleInputChange}
              />
          {/* {this.state.email} */}
          <br></br>
          {/* {this.state.emailpass} */}
          <Button className={classes.buttonForgot}color="transparent" >Forgot Password</Button>              
          <Button onClick={this.handleSubmit} className={classes.buttonSubmit}color="info" >Submit</Button>
          
          <br></br>
                <div className={classes.orButton}>Or</div> 
          <br></br>

          <Button className={classes.buttonMagic}color="info" >Send a Magic Link</Button>
          </form>
          </div>
        </Card>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(loginStyle)(LoginPage);
