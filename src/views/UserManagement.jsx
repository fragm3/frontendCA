import React from "react";
import PropTypes from "prop-types";
import { operateData } from "OperateData.jsx";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "assets/jss/views/dashboardStyle.jsx";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Snackbar from "components/Snackbar.jsx";
import Switch from "@material-ui/core/Switch";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Icon from "@material-ui/core/Icon";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Button from "components/Button.jsx";
import TablePagination from "@material-ui/core/TablePagination";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
var validator = require("email-validator");
var changeCase = require("change-case");

var url = "/user/crud_users/";
const emptymodaldata = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  is_admin: false,
  is_manager: false,
  is_staff: true
};

class UserManamgent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filterdata: { user_type: [], sort_by: [] },
      // pagination variables
      page_num: 0,
      page_size: 10,
      total_records: 0,
      // filter variables
      user_filter: "",
      search: "",
      sort_by: "",
      // Snackbar variables
      message: "",
      snackopen: false,
      // Modal variables
      modal: false,
      modaldata: emptymodaldata,
      is_new: true,
      errormessage: [],
      firstsumbit: false
    };
    // Table Data Management
    this.handleChange = this.handleChange.bind(this);
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
  }

  handleChange = (name, target) => event => {
    var data_old = this.state.data;
    var data_new = [];
    var data = {};
    var data_to_push = {};

    for (var i = 0; i < data_old.length; i++) {
      data = {};
      if (target === "first_name" || target === "last_name") {
        if (data_old[i].id === name) {
          data = data_old[i];
          data[target] = event.target.value;
          data_to_push = data;
        } else {
          data = data_old[i];
        }
      } else {
        if (data_old[i].id === name) {
          data = data_old[i];
          if (target === "is_admin") {
            if (event.target.checked) {
              data["is_manager"] = true;
            }
          } else if (target === "is_manager") {
            if (event.target.checked) {
              data["is_staff"] = true;
            }
          }
          data[target] = event.target.checked;
          data_to_push = data;
        } else {
          data = data_old[i];
        }
      }
      data_new.push(data);
    }

    this.setState({
      data: data_new
    });

    operateData(url, false, true, false, false, this, [
      ["operation", "update"],
      ["fname", data_to_push["first_name"]],
      ["lname", data_to_push["last_name"]],
      ["data_id", data_to_push["id"]],
      ["is_admin", data_to_push["is_admin"] ? "1" : "0"],
      ["is_manager", data_to_push["is_manager"] ? "1" : "0"],
      ["is_staff", data_to_push["is_staff"] ? "1" : "0"],
      ["is_active", data_to_push["is_active"] ? "1" : "0"]
    ]);
  };

  handleFilterChange = event => {
    var user_type = this.state.user_filter;
    var search = this.state.search;
    var sort_by = this.state.sort_by;
    if (event.target.name === "search") {
      this.setState({ search: event.target.value });
      search = event.target.value;
    }

    if (event.target.name === "sort_by") {
      this.setState({ sort_by: event.target.value });
      sort_by = event.target.value;
    }

    if (event.target.name === "user_type") {
      if (event.target.value === "") {
        this.setState({ user_filter: "staff" });
        user_type = "staff";
      } else {
        user_type = event.target.value;
      }
      this.setState({ user_filter: event.target.value });
    }

    operateData(url, true, false, false, false, this, [
      ["operation", "read"],
      ["user_type", user_type],
      ["search", search],
      ["sort_by", sort_by],
      ["page_num", this.state.page_num + 1],
      ["page_size", this.state.page_size]
    ]);
  };

  handleModalChange = event => {
    var data = this.state.modaldata;
    if (event.currentTarget.name === "staff_role") {
      if (event.currentTarget.value === "admin") {
        data["is_admin"] = true;
        data["is_manager"] = true;
        data["is_staff"] = true;
      } else if (event.currentTarget.value === "manager") {
        data["is_admin"] = false;
        data["is_manager"] = true;
        data["is_staff"] = true;
      } else {
        data["is_admin"] = false;
        data["is_manager"] = false;
        data["is_staff"] = true;
      }
    } else {
      data[event.currentTarget.name] = event.currentTarget.value;
    }
    this.setState({ modaldata: data });
  };

  modalClose = event => {
    this.setState({
      modal: false,
      modaldata: Object.assign({}, emptymodaldata),
      is_new: true,
      errormessage: [],
      firstsumbit: false
    });

    // console.log(this.state.modaldata)
  };

  modalOpen = event => {
    this.setState({ errormessage: [] });
    if (event.currentTarget.name === "newdata") {
      this.setState({
        modal: true,
        modaldata: Object.assign({}, emptymodaldata),
        is_new: true
      });
    } else {
      operateData(url, false, false, false, true, this, [
        ["operation", "read"],
        ["data_id", event.currentTarget.value]
      ]);
      this.setState({
        modal: true,
        is_new: false
      });
    }
  };

  checkerror() {
    var submit = true;
    var errorlist = [];
    this.setState({ errormessage: [] });
    if (this.state.modaldata.first_name === "") {
      submit = false;
      errorlist.push("firstname");
    }
    if (this.state.modaldata.last_name === "") {
      submit = false;
      errorlist.push("lastname");
    }
    if (
      this.state.modaldata.email === "" ||
      !validator.validate(this.state.modaldata.email)
    ) {
      submit = false;
      errorlist.push("email");
    }
    this.setState({ errormessage: errorlist });
    return submit;
  }

  keyUpHandler(e) {
    if (this.state.firstsumbit && e.target.value !== "") {
      this.checkerror();
    }
  }

  modalsubmitData = event => {
    var submit = this.checkerror();
    this.setState({ firstsumbit: true });
    if (submit) {
      if (this.state.is_new) {
        operateData(url, false, true, false, false, this, [
          ["operation", "create"],
          ["fname", this.state.modaldata.first_name],
          ["lname", this.state.modaldata.last_name],
          ["data_id", this.state.modaldata.id],
          ["email", this.state.modaldata.email],
          ["is_admin", this.state.modaldata.is_admin ? "1" : "0"],
          ["is_manager", this.state.modaldata.is_manager ? "1" : "0"],
          ["is_staff", this.state.modaldata.is_staff ? "1" : "0"],
          ["is_active", "1"]
        ]);
      } else {
        operateData(url, false, true, false, false, this, [
          ["operation", "update"],
          ["fname", this.state.modaldata.first_name],
          ["lname", this.state.modaldata.last_name],
          ["data_id", this.state.modaldata.id],
          ["is_admin", this.state.modaldata.is_admin ? "1" : "0"],
          ["is_manager", this.state.modaldata.is_manager ? "1" : "0"],
          ["is_staff", this.state.modaldata.is_staff ? "1" : "0"],
          ["is_active", this.state.modaldata.is_active ? "1" : "0"]
        ]);
      }
      operateData(url, true, false, false, false, this, [
        ["operation", "read"],
        ["user_type", "staff"],
        ["user_type", this.state.user_type],
        ["search", this.state.search],
        ["sort_by", this.state.sort_by],
        ["page_num", this.state.page_num + 1],
        ["page_size", this.state.page_size]
      ]);
      this.modalClose();
    }
  };

  handleChangePage = (event, page) => {
    this.setState({ page_num: page });
    operateData(url, true, false, true, false, this, [
      ["operation", "read"],
      ["user_type", "staff"],
      ["user_type", this.state.user_type],
      ["search", this.state.search],
      ["sort_by", this.state.sort_by],
      ["page_num", page + 1],
      ["page_size", this.state.page_size]
    ]);
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page_size: event.target.value });
    operateData(url, true, false, true, false, this, [
      ["operation", "read"],
      ["user_type", "staff"],
      ["user_type", this.state.user_type],
      ["search", this.state.search],
      ["sort_by", this.state.sort_by],
      ["page_num", this.state.page_num + 1],
      ["page_size", event.target.value]
    ]);
  };

  componentWillMount() {
    operateData(url, true, false, true, false, this, [
      ["operation", "read"],
      ["user_type", "staff"],
      ["page_num", this.state.page_num + 1],
      ["page_size", this.state.page_size]
    ]);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Fab
          color="primary"
          aria-label="Edit"
          onClick={this.modalOpen}
          name="newdata"
          className={classes.floatingButton}
        >
          <Icon>add</Icon>
        </Fab>
        <Grid container={true} alignItems="flex-end">
          <Grid item={true} xs={9}>
            <Icon className={classes.filterIcon}>filter_list</Icon>
            <FormControl className={classes.formControl}>
              <InputLabel className={classes.dropdownlabel} htmlFor="user-type">
                User Type
              </InputLabel>
              <Select
                className={classes.dropdownselect}
                value={this.state.user_filter}
                onChange={this.handleFilterChange}
                inputProps={{
                  name: "user_type",
                  id: "user-type"
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {this.state.filterdata.user_type.map((usertype, key) => (
                  <MenuItem key={key} value={usertype.id}>
                    {usertype.label}
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
                value={this.state.search}
                onChange={this.handleFilterChange}
              />
            </FormControl>
          </Grid>
          <Grid item={true} xs={3}>
            <Icon className={classes.filterIcon}>sort</Icon>
            <FormControl className={classes.formControl}>
              <InputLabel className={classes.dropdownlabel} htmlFor="user-type">
                Sort By
              </InputLabel>
              <Select
                className={classes.dropdownselect}
                value={this.state.sort_by}
                onChange={this.handleFilterChange}
                inputProps={{
                  name: "sort_by",
                  id: "sort"
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {this.state.filterdata.sort_by.map((sort, key) => (
                  <MenuItem key={key} value={sort.id}>
                    {sort.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container={true}>
          <Paper className={classes.tableContainer}>
            <Table className={classes.table}>
              <TableHead className={classes.tableHeader}>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell>Manager</TableCell>
                  <TableCell className={classes.lastchild} />
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.data.map((row, key) => {
                  return (
                    <TableRow dataid={row.id} key={key}>
                      <TableCell>
                        {changeCase.titleCase(row.first_name)}
                      </TableCell>
                      <TableCell>
                        {changeCase.titleCase(row.last_name)}
                      </TableCell>

                      <TableCell>{row.email}</TableCell>
                      <TableCell>
                        <Switch
                          checked={row.is_active}
                          onChange={this.handleChange(row.id, "is_active")}
                          value={row.id}
                          color="primary"
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          checked={row.is_admin}
                          color="primary"
                          onChange={this.handleChange(row.id, "is_admin")}
                          value={row.id}
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          checked={row.is_manager}
                          color="primary"
                          disabled={row.is_admin}
                          onChange={this.handleChange(row.id, "is_manager")}
                          value={row.id}
                        // ref = "is_manager"
                        />
                      </TableCell>
                      <TableCell className={classes.lastchild}>
                        <IconButton
                          name="edit_button"
                          value={row.id}
                          onClick={this.modalOpen}
                        >
                          <Icon>edit</Icon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20, 30, 40, 50]}
              component="div"
              count={this.state.total_records}
              rowsPerPage={this.state.page_size}
              page={this.state.page_num}
              backIconButtonProps={{
                "aria-label": "Previous Page"
              }}
              nextIconButtonProps={{
                "aria-label": "Next Page"
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
        <Modal
          open={this.state.modal}
          onClose={this.modalClose}
          className={classes.modalDesignUser}
        >
          <Paper className={classes.modalpaddingpaper}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                <h4>
                  <b>{this.state.is_new ? "Add" : "Edit"} User</b>
                </h4>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="first_name_new"
                  label="First Name"
                  name="first_name"
                  required
                  error={this.state.errormessage.indexOf("firstname") >= 0}
                  className={classes.fullwidth}
                  value={this.state.modaldata.first_name}
                  margin="normal"
                  onKeyUp={this.keyUpHandler}
                  onChange={this.handleModalChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="last_name_new"
                  label="Last Name"
                  name="last_name"
                  required
                  error={this.state.errormessage.indexOf("lastname") >= 0}
                  onKeyUp={this.keyUpHandler}
                  className={classes.fullwidth}
                  value={this.state.modaldata.last_name}
                  onChange={this.handleModalChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email_new"
                  label="Email"
                  name="email"
                  required
                  onKeyUp={this.keyUpHandler}
                  type="email"
                  error={this.state.errormessage.indexOf("email") >= 0}
                  className={classes.fullwidth}
                  value={this.state.modaldata.email}
                  onChange={this.handleModalChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <p>User Role</p>
                <RadioGroup
                  aria-label="Staff Role"
                  name="staff_role"
                  className={classes.radiohorizontal}
                  value={
                    this.state.modaldata.is_admin
                      ? "admin"
                      : this.state.modaldata.is_manager
                        ? "manager"
                        : "staff"
                  }
                  onChange={this.handleModalChange}
                >
                  <FormControlLabel
                    value="admin"
                    control={<Radio />}
                    label="Admin"
                  />
                  <FormControlLabel
                    value="manager"
                    control={<Radio />}
                    label="Manager"
                  />
                  <FormControlLabel
                    value="staff"
                    control={<Radio />}
                    label="Staff"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={12}>
                <Button color="info" onClick={this.modalsubmitData}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Modal>
        <Snackbar
          open={this.state.snackopen}
          messagecontent={this.state.message}
        />
      </div>
    );
  }
}

UserManamgent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(UserManamgent);
