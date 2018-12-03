/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { operateData } from "OperateData.jsx";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import loginStyle from "assets/jss/layouts/LoginStyle.jsx";
import Card from "components/Card/Card.jsx"
import Button from "components/Button.jsx"
import TextField from '@material-ui/core/TextField';
import Snackbar from 'components/Snackbar.jsx';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router';


class LoginPage extends React.Component {
  constructor(props) {
    super(props);  
    this.state = {
       email: '',
       emailpass:'',
       message:'',
       snackopen:false,
       redirect:false,
       data:{}
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
    operateData('/user/login_user/',true,true,false,false,this,
    [
      ['email',this.state.email],
      ['pass',this.state.emailpass]
    ])
  }

  componentWillMount(){
    const cookies = new Cookies();
    const auth_token = cookies.get('auth_token')
    operateData('/user/login_user/',true,false,false,false,this,
    [
      ['auth_token',auth_token]
    ])
  }
  
  componentDidUpdate(){
  try{
    if (this.state.data.auth === true){
      const user_auth_token = this.state.data.user.auth_token;
      const cookies = new Cookies();
      cookies.set('auth_token', user_auth_token, { path: '/' });
      this.setState({redirect:true});
    } 
  }
  catch(error){

  }
}
  
render() {  
    const { classes } = this.props;
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
                  value = {this.state.emailpass}
                  onChange={this.handleInputChange}
                />
            <br></br>
            <Button className={classes.buttonForgot} color="transparent" >Forgot Password</Button>              
            <Button onClick={this.handleSubmit} className={classes.buttonSubmit} color="info" >Submit</Button>
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
