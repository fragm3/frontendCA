import React from "react";
import PropTypes from "prop-types";
import axios from 'axios'
import { baseurl } from "ApiBase.jsx";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "assets/jss/views/dashboardStyle.jsx";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import GridContainer from 'components/Grid/GridContainer.jsx'
import Snackbar from 'components/Snackbar.jsx';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

var changeCase = require('change-case')
const WAIT_INTERVAL = 5000;

class UserManamgent extends React.Component {
  constructor(props) {
    super(props);  
    this.state = {
        data : [],
        message:'',
        snackopen:false

    }
    this.handleChange = this.handleChange.bind(this);
   };


  //  handleInputChange(event) {
  //   const target = event.target;
  //   const value = target.value;
  //   const name = target.name;
  //   this.setState({
  //     [name]: value
  //   });
  // }

  componentWillMount() {
    this.timer = null;
}
  handleChange = (name,target) => event => {
    clearTimeout(this.timer);
    console.log(name)
    console.log(target)
    var data_old = this.state.data
    var data_new = []
    var i 
    var data = {}
    var data_to_push = {}
    console.log(event.target.name.checked)
    for (i = 0; i < data_old.length; i++) {             
        data = {}
        if(target==="first_name" || target ==="last_name"){
          if(data_old[i].id === name){
            data = data_old[i]
            data[target] = event.target.value
            data_to_push = data
          }else{
            data = data_old[i]
          }
        }else{
          if(data_old[i].id === name){
            data = data_old[i]
            data[target] = event.target.checked
            data_to_push = data
          }else{
            data = data_old[i]
          }  
        }
        data_new.push(data)
    }
    this.setState({
      data:data_new
    });

    this.timer = setTimeout(this.triggerChange(data_to_push), WAIT_INTERVAL);

    // this.setState({ [name]: event.target.name.checked });
  };


  triggerChange(data_to_push) {
    var bodyFormData = new FormData();
    console.log(data_to_push)
    bodyFormData.set('operation', 'update');
    bodyFormData.set('fname', data_to_push['first_name']);
    bodyFormData.set('lname', data_to_push['last_name']);
    bodyFormData.set('data_id', data_to_push['id']);
    if (data_to_push['is_admin']){
      bodyFormData.set('is_admin', '1');
    }else{
      bodyFormData.set('is_admin', '0');
    }
    if (data_to_push['is_manager']){
      bodyFormData.set('is_manager', '1');
    }else{
      bodyFormData.set('is_manager', '0');
    }
    if (data_to_push['is_staff']){
      bodyFormData.set('is_staff', '1');
    }else{
      bodyFormData.set('is_staff', '0');
    }
    if (data_to_push['is_active']){
      bodyFormData.set('is_active', '1');
    }else{
      bodyFormData.set('is_active', '0');
    }

    axios({
      method: 'post',
      baseURL:{baseurl}.baseurl,
      url: '/user/crud_users/',
      data: bodyFormData,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
      })
      .then((response) => {
          const valuemessage = response.data.message;
          this.setState({message:valuemessage, 
            snackopen:true,
            // data:response.data.result
          });
         })
      .catch(function (response) {
   
      });
  
  }

  componentDidMount() {
    var bodyFormData = new FormData();
    bodyFormData.set('operation', 'read');
    // alert({baseurl}.baseurl)
    axios({
      method: 'post',
      baseURL:{baseurl}.baseurl,
      url: '/user/crud_users/',
      data: bodyFormData,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
      })
      .then((response) => {
          const valuemessage = response.data.message;
          this.setState({message:valuemessage, 
            snackopen:true,
            data:response.data.result
          });
         })
      .catch(function (response) {
   
      });

  }

  render() {
    setTimeout(() => {
      this.setState({
        message:'',
        snackopen:false
       });
    }, 5000);

    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {/* <TableCell>S.No.</TableCell> */}
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>Manager</TableCell>
                {/* <TableCell>Staff</TableCell> */}
                {/* <TableCell></TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map((row,key) => {
           
                return (
                  <TableRow dataid={row.id} key={key}>
                    {/* <TableCell component="th" scope="row"> */}
                      {/* {row.id.id} */}
                    {/* </TableCell> */}
                    {/* <TableCell >{changeCase.titleCase(row.first_name)} {changeCase.titleCase(row.last_name)} </TableCell> */}
                    <TableCell >
                    <TextField
                      id="standard-bare"
                      className={classes.textField}
                      defaultValue={changeCase.titleCase(row.first_name)}
                      onChange={this.handleChange(row.id,"first_name")}
                      margin="normal"
                    /></TableCell>
                    <TableCell >
                    <TextField
                      id="standard-bare"
                      className={classes.textField}
                      defaultValue={changeCase.titleCase(row.last_name)}
                      onChange={this.handleChange(row.id,"last_name")}
                      margin="normal"
                    />                
                    </TableCell>
                    {/* <TableCell >{changeCase.titleCase(row.first_name)} {changeCase.titleCase(row.last_name)} </TableCell> */}
                    <TableCell >{row.email}</TableCell>
                    <TableCell > <Switch
                      checked={row.is_active}
                      onChange={this.handleChange(row.id,"is_active")}
                      value= {row.id}
                      color="primary"
                      // ref = "is_active"
                    />  
                    </TableCell> 
                    <TableCell >
                    <Checkbox
                      checked= {row.is_admin}
                      color="primary"
                      onChange={this.handleChange(row.id,"is_admin")}
                      value= {row.id}
                      // ref = "is_admin"
                    />
                    </TableCell>
                    <TableCell >
                      <Checkbox
                      checked= {row.is_manager}
                      color="primary"
                      disabled = {row.is_admin}
                      onChange={this.handleChange(row.id,"is_manager")}
                      value = {row.id}
                      // ref = "is_manager"
                      />
                      </TableCell>
                    {/* <TableCell >
                    <Checkbox
                      checked= {row.is_staff}
                      color="primary"
                      disabled = {row.is_manager}
                      onChange={this.handleChange(row.id,"is_staff")}
                      value = {row.id}
                    />
                    </TableCell> */}
                  </TableRow>
                
              );
              })}
            </TableBody>
          </Table>
        </Paper>
        </GridContainer>
        <Snackbar open={this.state.snackopen} messagecontent={this.state.message}></Snackbar>
       </div>
    );
  }
}

UserManamgent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(UserManamgent);
