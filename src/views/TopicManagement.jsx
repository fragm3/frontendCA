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
import Button from "components/Button.jsx";
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
var changeCase = require('change-case');

var url = '/question/crud_topics/'
var emptymodaldata =  {
  "category": "",
  "description": "",
  "id": "",
  "sub_category": ""
}

class TopicManagement extends React.Component {
  constructor(props) {
    super(props);  
    this.state = {
        data : [],
        filterdata:{sort_by:[],category:[]},
        // pagination variables
        page_num:0,
        page_size:10,
        total_records:0,
        // filter variables
        search:"",
        sort_by:"",
        category:"",
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
    var category = this.state.category

    if (event.target.name ==="search"){
      this.setState({ search: event.target.value });   
      search = event.target.value
    }

    if (event.target.name ==="sort_by"){
      this.setState({ sort_by: event.target.value });   
      sort_by = event.target.value
    }

    if (event.target.name ==="category"){
      this.setState({ category: event.target.value });   
      category = event.target.value
    }


  
    operateData(url, true,false,false,false,this,
    [
      ['operation', 'read'],
      ['page_num',(this.state.page_num + 1)],
      ['page_size',this.state.page_size],
      ['search',search],
      ['sort_by',sort_by],
      ['category',category],
    ]);   

};

handleModalChange = event => {
  console.log(event.target.name)
  var data = this.state.modaldata;
  data[event.currentTarget.name] = event.currentTarget.value ;
  this.setState({modaldata:data});
}

modalClose = event => {

  var emptymodaldata = {
    "category": "",
    "description": "",
    "id": "",
    "sub_category": ""
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
    "category": "",
    "description": "",
    "id": "",
    "sub_category": ""
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
      operateData(url, true,false,true,false,this,
      [
        ['operation', 'read'],
        ['page_num',(this.state.page_num+1)],
        ['page_size',this.state.page_size],
        ['search',this.state.search],
        ['sort_by',this.state.sort_by],
        ['category',this.state.category],
  
      ]);
      }, 1000);
  }



checkerror(){
  var submit=true
  var errorlist = []
  this.setState({errormessage:[]});
  if (this.state.modaldata.category === ""){
    submit = false
    errorlist.push("category")
  }
  if (this.state.modaldata.description === ""){
    submit = false
    errorlist.push("description")
  }
  if (this.state.modaldata.sub_category === ""){
    submit = false
    errorlist.push("sub_category")
  }

  this.setState({errormessage:errorlist})
  return submit
}

keyUpHandler(e) {
  if (this.state.firstsumbit && e.target.value !== ""){
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
        ['category', this.state.modaldata.category],
        ['subcategory', this.state.modaldata.sub_category],
        ['desc', this.state.modaldata.description],
      ]);
    }else{
      operateData(url,false,true,false,false,
      this,
      [
        ['operation', 'update'],
        ['category', this.state.modaldata.category],
        ['subcategory', this.state.modaldata.sub_category],
        ['desc', this.state.modaldata.description],
        ['data_id', this.state.modaldata.id],
      ]);
    }
    setTimeout(() => {
      this.modalClose()
      operateData(url, true,false,true,false,this,
      [
        ['operation', 'read'],
        ['page_num',(this.state.page_num+1)],
        ['page_size',this.state.page_size],
        ['search',this.state.search],
        ['sort_by',this.state.sort_by],
        ['category',this.state.category],
  
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
    ['category',this.state.category],

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
    ['category',this.state.category],

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
            <InputLabel className={classes.dropdownlabel} htmlFor="user-type">Category</InputLabel>
            <Select 
              className={classes.dropdownselect}
              value={this.state.category}
              onChange={this.handleFilterChange}
              inputProps={{
                name: 'category',
                id: 'category',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {this.state.filterdata.category.map((sort,key) => (
              <MenuItem key={key} value={sort.id}>
                {sort.label}
              </MenuItem>
              ))}
            </Select>
          </FormControl> 
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
        <Paper className={classes.tableContainer}>
          <Table className={classes.table}>
          <TableHead className={classes.tableHeader}>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Sub Category</TableCell>
                <TableCell>Description</TableCell>
                <TableCell className={classes.lastchild}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map((row,key) => {
                return (
                  <TableRow dataid={row.id} key={key}>
                    <TableCell >
                    {changeCase.titleCase(row.category)} 
                    </TableCell>
                    <TableCell >
                    {changeCase.titleCase(row.sub_category)} 
                    </TableCell>
                    <TableCell >
                    {changeCase.titleCase(row.description)} 
                    </TableCell>
                    <TableCell className={classes.lastchild}>
                      <IconButton  name="edit_button" value={row.id} onClick={this.modalOpen}>
                        <Icon>edit</Icon>
                      </IconButton>    
                      <IconButton  name="edit_button" value={row.id} onClick={this.deleteData}>
                        <Icon>delete</Icon>
                      </IconButton>    

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
                Reminder : This should be autocomplete 
                <TextField 
                  id="category_2"
                  label="Category"
                  name = "category"
                  required
                  fullWidth
                  error={this.state.errormessage.indexOf("category") >= 0}
                  value={this.state.modaldata.category}
                  margin="normal"
                  onKeyUp={this.keyUpHandler}
                  onChange = {this.handleModalChange}
                />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                  id="sub_category"
                  label="Sub Category"
                  name = "sub_category"
                  required
                  error={this.state.errormessage.indexOf("sub_category") >= 0}
                  value={this.state.modaldata.sub_category}
                  margin="normal"
                  onKeyUp={this.keyUpHandler}
                  onChange = {this.handleModalChange}
                  fullWidth
                />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                  id="description"
                  label="Description"
                  name = "description"
                  required
                  multiline
                  fullWidth
                  rows="4"
                  error={this.state.errormessage.indexOf("description") >= 0}
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

TopicManagement.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(TopicManagement);
