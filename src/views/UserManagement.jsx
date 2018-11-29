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

class UserManamgent extends React.Component {
  constructor(props) {
    super(props);  
    this.state = {
        data : [],
        message:'',
        snackopen:false
    }
    this.handleChange = this.handleChange.bind(this);
    this.operateData = this.operateData.bind(this);
   };

handleChange = (name,target) => event => {
    var data_old = this.state.data
    var data_new = []
    var data = {}
    var data_to_push = {}

    for (var i = 0; i < data_old.length; i++) {             
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
  
    this.operateData('/user/crud_users/','update',
    [
      ['fname', data_to_push['first_name']],
      ['lname',  data_to_push['last_name']],
      ['data_id', data_to_push['id']],
      ['is_admin', data_to_push['is_admin'] ? "1" : "0" ],
      ['is_manager', data_to_push['is_manager'] ? "1" : "0" ],
      ['is_staff', data_to_push['is_staff'] ? "1" : "0" ],
      ['is_active', data_to_push['is_active'] ? "1" : "0" ],
    ],
    false
    );
  };



operateData(url,operation,filters,update_result){
  var bodyFormData = new FormData();
  bodyFormData.set('operation', operation);
  console.log(filters)
  for (var i = 0; i < filters.length; i++) {             
    bodyFormData.set(filters[i][0],filters[i][1]);  
  }
  axios({
    method: 'post',
    baseURL:{baseurl}.baseurl,
    url: url,
    data: bodyFormData,
    config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then((response) => {
        const valuemessage = response.data.message;
        if(update_result){
          this.setState({message:valuemessage, 
            snackopen:true,
            data:response.data.result
          });
        }else{
          this.setState({message:valuemessage, 
            snackopen:true,
          })
        }
      })
    .catch((response) => {
      this.setState({message:'Something Went Wrong', 
        snackopen:true,
      })
    });
}

componentDidMount() {
    this.operateData('/user/crud_users/','read',
    [
      ['is_staff','1']
    ],
    true
    );
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

        </GridContainer>
        <GridContainer>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>Manager</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map((row,key) => {
                return (
                  <TableRow dataid={row.id} key={key}>
                    <TableCell >
                    <TextField
                      id="standard-bare"
                      className={classes.textField}
                      defaultValue={changeCase.titleCase(row.first_name)}
                      // onChange={this.handleChange(row.id,"first_name")}
                      onBlur={this.handleChange(row.id,"first_name")}
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
                    <TableCell >{row.email}</TableCell>
                    <TableCell > <Switch
                      checked={row.is_active}
                      onChange={this.handleChange(row.id,"is_active")}
                      value= {row.id}
                      color="primary"
                    />  
                    </TableCell> 
                    <TableCell >
                    <Checkbox
                      checked= {row.is_admin}
                      color="primary"
                      onChange={this.handleChange(row.id,"is_admin")}
                      value= {row.id}
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
