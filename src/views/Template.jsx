import React from "react";
import PropTypes from "prop-types";
import { operateData } from "OperateData.jsx";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "assets/jss/views/dashboardStyle.jsx";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Snackbar from 'components/Snackbar.jsx';

import TextField from '@material-ui/core/TextField';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Button from "components/Button.jsx"
import TablePagination from '@material-ui/core/TablePagination';

var url = '/question/crud_folders/'
var emptymodaldata =  {
  "description": "",
  "id": "",
  "folder_name": ""
}

class QuestionFolder extends React.Component {
  constructor(props) {
    super(props);  
    this.state = {
        data : [],
        filterdata:{sort_by:[]},
        // pagination variables
        page_num:0,
        page_size:10,
        total_records:0,
        // filter variables
        search:"",
        sort_by:"",
        // Snackbar variables
        message:'',
        snackopen:false,
        // Modal variables
        modal:false,
        modaldata:emptymodaldata,
        is_new:true,
        errormessage:[],
        firstsumbit:false,
    }
    // Filter Function
    this.handleFilterChange = this.handleFilterChange.bind(this);
    // Modal Management
    this.modalClose = this.modalClose.bind(this);
    this.modalOpen = this.modalOpen.bind(this);
    this.handleModalChange = this.handleModalChange.bind(this);
    this.modalsubmitData = this.modalsubmitData.bind(this);
    this.checkerror = this.checkerror.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    // Pagination
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    
   };


handleFilterChange = event => {
    
    var search = this.state.search
    var sort_by = this.state.sort_by

    if (event.target.name ==="search"){
      this.setState({ search: event.target.value });   
      search = event.target.value
    }

    if (event.target.name ==="sort_by"){
      this.setState({ sort_by: event.target.value });   
      sort_by = event.target.value
    }


  
    operateData(url, true,false,false,false,this,
    [
      ['operation', 'read'],
      ['page_num',(this.state.page_num + 1)],
      ['page_size',this.state.page_size],
      ['search',search],
      ['sort_by',sort_by],
    ]);   

};

handleModalChange = event => {
  var data = this.state.modaldata;
  data[event.currentTarget.name] = event.currentTarget.value ;
  this.setState({modaldata:data});
}

modalClose = event => {

  var emptymodaldata = {
    "description": "",
    "id": "",
    "folder_name": ""
  };


  this.setState({ 
    modal: false,
    modaldata:emptymodaldata,
    is_new: true    ,
    errormessage:[],
    firstsumbit:false,
  });

  // console.log(this.state.modaldata)
}

modalOpen = event => {
  
  var emptymodaldata = {
    "description": "",
    "id": "",
    "folder_name": ""
  };

  this.setState({errormessage:[]});
  if (event.currentTarget.name === "newdata"){
    this.setState({ 
      modal: true ,
      modaldata:emptymodaldata,
      is_new: true,
    });
  }else{  
  operateData(url, false,false,false,true,this,
    [
      ['operation', 'read'],
      ['data_id',event.currentTarget.value]
    ]);
    this.setState({ 
      modal: true,
      is_new: false
    });
  }
}

deleteData = event => {
  operateData(url, false,true,false,false,this,
    [
      ['operation', 'delete'],
      ['data_id',event.currentTarget.value]
    ]);

    setTimeout(() => {
      this.modalClose()
      operateData(url, true,false,false,false,this,
      [
        ['operation', 'read'],
        ['page_num',(this.state.page_num+1)],
        ['page_size',this.state.page_size],
        ['search',this.state.search],
        ['sort_by',this.state.sort_by],
  
      ]);
      }, 1000);
  }



checkerror(){
  var submit=true
  var errorlist = []
  this.setState({errormessage:[]});
  if (this.state.modaldata.folder_name === ""){
    submit = false
    errorlist.push("folder_name")
  }
  if (this.state.modaldata.description === ""){
    submit = false
    errorlist.push("description")
  }

  this.setState({errormessage:errorlist})
  return submit
}

keyUpHandler(e) {
  if (this.state.firstsumbit && e.target.value != ""){
    this.checkerror()
  }
}

modalsubmitData = event => {
  var submit = this.checkerror()
  this.setState({firstsumbit:true})
  if (submit){
    if(this.state.is_new){
      operateData(url,false,true,false,false,
      this,
      [
        ['operation', 'create'],
        ['folder_name', this.state.modaldata.folder_name],
        ['desc', this.state.modaldata.description],
      ]);
    }else{
      operateData(url,false,true,false,false,
      this,
      [
        ['operation', 'update'],
        ['folder_name', this.state.modaldata.folder_name],
        ['desc', this.state.modaldata.description],
        ['data_id', this.state.modaldata.id],
      ]);
    }
    setTimeout(() => {
      this.modalClose()
      operateData(url, true,false,false,false,this,
      [
        ['operation', 'read'],
        ['page_num',(this.state.page_num+1)],
        ['page_size',this.state.page_size],
        ['search',this.state.search],
        ['sort_by',this.state.sort_by],
  
      ]);
      }, 1000);
  }

}


handleChangePage = (event, page) => {
  this.setState({ page_num : page });
  operateData(url, true,false,true,false,this,
  [
    ['operation', 'read'],
    ['page_num',(page+1)],
    ['page_size',this.state.page_size],
    // Insert Read Filters
    ['search',this.state.search],
    ['sort_by',this.state.sort_by],

  ]);
};

handleChangeRowsPerPage = event => {
  this.setState({ page_size : event.target.value });
  operateData(url, true,false,true,false,this,
  [
    ['operation', 'read'],
    ['page_num',(this.state.page_num+1)],
    ['page_size',event.target.value],

    // Insert Read Filters
    ['search',this.state.search],
    ['sort_by',this.state.sort_by],

  ]);
};

componentWillMount(){
  operateData(url, true,false,true,false,this,
  [
    ['operation', 'read'],
    ['page_num',(this.state.page_num + 1)],
    ['page_size',this.state.page_size],
    
  ]);
}

render() {
    const { classes } = this.props;
    return ( 
      <div>
        <Fab color="primary" aria-label="Edit"  onClick={this.modalOpen}  name="newdata" className={classes.floatingButton}>
            <Icon>add</Icon>
        </Fab>
        {/* Search Input Starts */}
        <Grid  container={true}  alignItems = "flex-end">
        <Grid item={true} xs={9}>
          <Icon className={classes.filterIcon}>filter_list</Icon>
          <FormControl className={classes.formControl}>   
          <TextField
            id="searchInput"
            label="Search"
            className={classes.textField}
            type="text"
            name="search"
            margin="normal"
            value = {this.state.search}
            onChange={this.handleFilterChange}
          />
            </FormControl>  
          </Grid>
          <Grid item={true} xs={3}>
          <Icon className={classes.filterIcon}>sort</Icon>
          <FormControl className={classes.formControl}>
          <InputLabel className={classes.dropdownlabel} htmlFor="user-type">Sort By</InputLabel>
          <Select 
            className={classes.dropdownselect}
            value={this.state.sort_by}
            onChange={this.handleFilterChange}
            inputProps={{
              name: 'sort_by',
              id: 'sort',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {this.state.filterdata.sort_by.map((sort,key) => (
            <MenuItem key={key} value={sort.id}>
              {sort.label}
            </MenuItem>
            ))}
          </Select>
          </FormControl>   
          </Grid>
        </Grid>
                {/* Search Input Ends */}
        <Grid container={true}>
        <Paper>
          <Table className={classes.table}>
          <TableHead className={classes.tableHeader}>
              <TableRow>
                <TableCell>Folder Name</TableCell>
                <TableCell>Folder Description</TableCell>
                <TableCell>Controls</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map((row,key) => {
                return (
                  <TableRow dataid={row.id} key={key}>
                    <TableCell >
                    {row.folder_name} 
                    </TableCell>
                    <TableCell >
                    {row.description} 
                    </TableCell>
                    <TableCell>
                      <Button color="transparent" name="edit_button" value={row.id} onClick={this.modalOpen}>
                        <Icon>edit</Icon>
                      </Button>    
                      <Button color="transparent" name="edit_button" value={row.id} onClick={this.deleteData}>
                        <Icon>delete</Icon>
                      </Button>    

                    </TableCell>
                  </TableRow>
              );
              })}
            </TableBody>
          </Table>
          <TablePagination
          rowsPerPageOptions={[5,10, 20, 30, 40, 50]}
          component="div"
          count={this.state.total_records}
          rowsPerPage={this.state.page_size}
          page={this.state.page_num} 
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        </Paper>
        </Grid>
        <Modal open={this.state.modal} onClose={this.modalClose} className={classes.modalDesignUser} >
          <Paper className={classes.modalpaddingpaper}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center">
            <Grid item xs={12}>
            <h4><b>{this.state.is_new ? "Add" : "Edit"} Question Folder</b></h4> 
            </Grid>
            <Grid item xs={12}>
              <TextField 
                  id="folder_name"
                  label="Folder Name"
                  name = "folder_name"
                  required
                  error={this.state.errormessage.indexOf("folder_name") >= 0}
                  className = {classes.fullwidth}
                  value={this.state.modaldata.folder_name}
                  margin="normal"
                  onKeyUp={this.keyUpHandler}
                  onChange = {this.handleModalChange}
                />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                  id="description"
                  label="Description"
                  name = "description"
                  required
                  error={this.state.errormessage.indexOf("description") >= 0}
                  className = {classes.fullwidth}
                  value={this.state.modaldata.description}
                  margin="normal"
                  onKeyUp={this.keyUpHandler}
                  onChange = {this.handleModalChange}
                />
            </Grid>
            <Grid item xs={12}>
                <Button color="info" onClick={this.modalsubmitData}>Submit</Button>
            </Grid>       
            </Grid>       
          </Paper>
        </Modal>   
        <Snackbar open={this.state.snackopen} messagecontent={this.state.message}></Snackbar>
       </div>
    );
  }
}

QuestionFolder.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(QuestionFolder);
