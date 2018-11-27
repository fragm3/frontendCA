/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import loginStyle from "assets/jss/layouts/LoginStyle.jsx";
import Card from "components/Card/Card.jsx"
import Button from "components/Button.jsx"
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { baseurl } from "ApiBase.jsx";
import Snackbar from 'components/Snackbar.jsx';
import Cookies from 'universal-cookie';
import {Route, Redirect } from 'react-router'

class LoginPage extends React.Component {
  constructor(props) {
    super(props);  
    this.state = {
       email: '',
       emailpass:'',
       message:'',
       snackopen:false,
       redirect:false
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


  componentDidMount(){
    const cookies = new Cookies();
    var bodyFormData = new FormData();
    bodyFormData.set('auth_token', cookies.get('auth_token'));
    var redirect = false;
    axios({
    method: 'post',
    baseURL:{baseurl}.baseurl,
    data: bodyFormData,
    url: '/user/login_user/',
    config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then((response) => {
        // console.log("1")
        const valuemessage = response.data.message;
        this.setState({message:valuemessage, 
          // snackopen:true  
        });
        if(response.data.result.auth === true){
          console.log("auth");
          this.setState({redirect:true});
        }
      })
    .catch((response) => {
      this.setState({message:"Something Went Wrong!", 
        // snackopen:true  
      })
      console.log(response);
    });
  }
  
  handleSubmit(event) {
    var bodyFormData = new FormData();
    bodyFormData.set('email', this.state.email);
    bodyFormData.set('pass', this.state.emailpass);
    // alert({baseurl}.baseurl)
    axios({
      method: 'post',
      baseURL:{baseurl}.baseurl,
      url: '/user/login_user/',
      data: bodyFormData,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
      })
      .then((response) => {
          const valuemessage = response.data.message;
          this.setState({message:valuemessage, 
            snackopen:true  
          });
          if(response.data.result.auth === true){
            const user_auth_token = response.data.user.auth_token;
            const cookies = new Cookies();
            cookies.set('auth_token', user_auth_token, { path: '/' });
            console.log(cookies.get('auth_token')); // Pacman
            this.setState({redirect:true});
            // return <Redirect to='/adminpanel' />
          }
        })
      .catch(function (response) {
        this.setState({message:"Something Went Wrong!", 
          snackopen:true  
        })
        console.log(response);
      });
  }

  
  render() {

    setTimeout(() => {
      this.setState({
        message:'',
        snackopen:false
       });
    }, 2500);
  
    const { classes, ...rest } = this.props;
    const { redirect } = this.state
    if (redirect === true) {
      return <Redirect to='/adminpanel' />;
    }else{
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
          <Snackbar open={this.state.snackopen} messagecontent={this.state.message}></Snackbar>
        </div>
      );
    }

    

  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(loginStyle)(LoginPage);
