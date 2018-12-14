import React from "react";
import PropTypes from "prop-types";
import { api } from "./../helpers/api.js";
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
import Select from "react-select";
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

import "./style.css";

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
  is_staff: true,
  is_active: true
};

const filterByOptions = [
  { label: "Staff", value: "staff" },
  { label: "Manager", value: "manager" },
  { label: "Admin", value: "admin" }
];

const sortByOptions = [
  { label: "None", value: "none" },
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Email", value: "email" }
];

class UserManamgent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          auth_token: "",
          email: "",
          first_name: "",
          id: "",
          is_active: true,
          is_admin: false,
          is_manager: false,
          is_staff: true,
          last_name: "",
          secret_string: ""
        }
      ],
      filterdata: { user_type: [], sort_by: [], order_by: "" },
      // pagination variables
      page_num: 0,
      page_size: 10,
      total_records: 0,
      // filter variables
      user_filter: [],
      search: "",
      sort_by: "",
      order_by: "asc",
      // Snackbar variables
      snackbarMessage: "",
      showSnackbar: false,
      // Modal variables
      modal: false,
      modaldata: emptymodaldata,
      is_new: true,
      errormessage: [],
      firstSubmit: false,
      activeUserId: "",
      name: [],
      filterValue: ""
    };
  }

  hideSnackbar = () => {
    setTimeout(
      () => this.setState({ showSnackbar: false, snackbarMessage: "" }),
      2500
    );
  };
  handleChange = (name, target) => event => {
    var data_old = this.state.data;
    var data_new = [];
    var data = {};
    var data_to_push = {};

    for (var i = 0; i < data_old.length; i++) {
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

    api(url, [
      ["operation", "update"],
      ["fname", data_to_push["first_name"]],
      ["lname", data_to_push["last_name"]],
      ["data_id", data_to_push["id"]],
      ["is_admin", data_to_push["is_admin"] ? "1" : "0"],
      ["is_manager", data_to_push["is_manager"] ? "1" : "0"],
      ["is_staff", data_to_push["is_staff"] ? "1" : "0"],
      ["is_active", data_to_push["is_active"] ? "1" : "0"]
    ])
      .then(response => {
        console.log(response, "Response");
        const { message } = response;
        this.setState({ showSnackbar: true, snackbarMessage: message });
      })
      .catch(error => {
        console.log("Could not user Data");
      });
    this.hideSnackbar();
  };

  handleSearchChange = event => {
    var search = this.state.search;
    this.setState({ page_num: 0 });
    if (event.target.name === "search") {
      this.setState({ search: event.target.value });
      search = event.target.value;
    }
    api(url, [
      ["operation", "read"],
      ["search", search],
      ["page_num", 1],
      ["page_size", this.state.page_size]
    ]).then(response => {
      const { result, total_records } = response;
      console.log(response.result, "For filter change");
      this.setState({ data: result, total_records: total_records });
    });
  };

  //Solo super select
  handleSortChange = value => {
    this.setState({ sortValue: value });
    this.setState({ sort_by: value.value });
    api(url, [
      ["operation", "read"],
      ["sort_by", value.value],
      ["page_num", 1],
      ["page_size", this.state.page_size],
      ["order_by", "asc"]
    ]).then(response => {
      const { result, total_records } = response;
      console.log(response.result, "For sort by change");
      this.setState({ data: result, total_records: total_records });
    });
  };

  //Multi super select
  handleFilterChange = value => {
    console.log("You have selected value: ", value);
    this.setState({ filterValue: value });
    var arr = [];
    for (var i = 0, l = value.length; i < l; i++) {
      arr.push(value[i].value + ",");
    }
    console.log(arr, "Arr");
    this.setState({ user_type: arr });
    api(url, [
      ["operation", "read"],
      ["user_type", arr],
      ["page_num", 1],
      ["page_size", this.state.page_size],
      ["order_by", "asc"]
    ]).then(response => {
      const { result, total_records } = response;
      console.log(response.result, "For filter change");
      this.setState({ data: result, total_records: total_records });
    });
  };

  toggleOrderBy = () => {
    let orderBy = this.state.order_by;
    let toggle;
    toggle = orderBy === "asc" ? "desc" : "asc";
    this.setState({ order_by: toggle });
    api(url, [
      ["operation", "read"],
      ["user_type", this.state.user_type],
      ["sort_by", this.state.sort_by],
      ["order_by", toggle],
      ["page_num", 1],
      ["page_size", this.state.page_size]
    ]).then(response => {
      const { result, total_records } = response;
      console.log(response.result, "For filter change");
      this.setState({ data: result, total_records: total_records });
    });
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
      firstSubmit: false
    });
  };

  editUserModal = event => {
    this.setState({
      modal: true,
      is_new: false,
      errormessage: [],
      activeUserId: event.currentTarget.value
    });
    api(url, [
      ["operation", "read"],
      ["data_id", event.currentTarget.value]
    ]).then(response => {
      this.setState({ modaldata: response.result[0] });
    });
  };

  addUserModal = () => {
    this.setState({
      modal: true,
      modaldata: Object.assign({}, emptymodaldata),
      is_new: true
    });
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

  keyUpHandler = event => {
    if (this.state.firstSubmit && event.target.value.length <= 1) {
      this.checkerror();
      console.log("check run");
    }
  };

  modalsubmitData = event => {
    var submit = this.checkerror();
    this.setState({ firstSubmit: true });
    if (submit) {
      const userList = this.state.data;
      const index = userList.findIndex(x => x.id === this.state.activeUserId);
      if (this.state.is_new) {
        api(url, [
          ["operation", "create"],
          ["fname", this.state.modaldata.first_name],
          ["lname", this.state.modaldata.last_name],
          ["data_id", this.state.modaldata.id],
          ["email", this.state.modaldata.email],
          ["is_admin", this.state.modaldata.is_admin ? "1" : "0"],
          ["is_manager", this.state.modaldata.is_manager ? "1" : "0"],
          ["is_staff", this.state.modaldata.is_staff ? "1" : "0"],
          ["is_active", "1"]
        ]).then(response => {
          console.log(response, "Response from create");
          this.setState({
            snackbarMessage: response.message,
            showSnackbar: true,
            data: [response.result[0], ...this.state.data]
          });
        });
      } else {
        api(url, [
          ["operation", "update"],
          ["fname", this.state.modaldata.first_name],
          ["lname", this.state.modaldata.last_name],
          ["data_id", this.state.modaldata.id],
          ["is_admin", this.state.modaldata.is_admin ? "1" : "0"],
          ["is_manager", this.state.modaldata.is_manager ? "1" : "0"],
          ["is_staff", this.state.modaldata.is_staff ? "1" : "0"],
          ["is_active", this.state.modaldata.is_active ? "1" : "0"]
        ]).then(response => {
          console.log(response, "Response from edit");
          this.setState({
            snackbarMessage: response.message,
            showSnackbar: true,
            data: [
              ...this.state.data.slice(0, index),
              response.result[0],
              ...this.state.data.slice(index + 1)
            ]
          });
        });
      }
      this.modalClose();
    }
    this.hideSnackbar();
  };

  handleChangePage = (event, page) => {
    this.setState({ page_num: page });
    api(url, [
      ["operation", "read"],
      ["user_type", "staff"],
      ["user_type", this.state.user_type],
      ["search", this.state.search],
      ["sort_by", this.state.sort_by],
      ["page_num", page + 1],
      ["page_size", this.state.page_size]
    ]).then(response => {
      const { result } = response;
      this.setState({
        data: result
        // total_records: total_records
      });
    });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page_size: event.target.value });
    api(url, [
      ["operation", "read"],
      ["user_type", "staff"],
      ["user_type", this.state.user_type],
      ["search", this.state.search],
      ["sort_by", this.state.sort_by],
      ["page_num", this.state.page_num + 1],
      ["page_size", event.target.value]
    ]).then(response => {
      const { result } = response;
      this.setState({
        data: result
        // total_records: total_records
      });
    });
  };

  componentDidMount() {
    api(url, [
      ["operation", "read"],
      ["user_type", "staff"],
      ["page_num", this.state.page_num + 1],
      ["page_size", this.state.page_size]
    ]).then(response => {
      const { result, total_records, filter } = response;
      this.setState({
        data: result,
        total_records: total_records,
        filterdata: filter
      });
    });
  }

  render() {
    const { classes } = this.props;
    let renderTableBodyElement = null;
    if (this.state.data !== null) {
      renderTableBodyElement = this.state.data.map((row, key) => {
        return (
          <TableRow dataid={row.id} key={key}>
            <TableCell>{changeCase.titleCase(row.first_name)}</TableCell>
            <TableCell>{changeCase.titleCase(row.last_name)}</TableCell>

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
              />
            </TableCell>
            <TableCell className={classes.lastchild}>
              <IconButton
                name="edit_button"
                value={row.id}
                onClick={this.editUserModal}
              >
                <Icon>edit</Icon>
              </IconButton>
            </TableCell>
          </TableRow>
        );
      });
    }
    return (
      <div>
        <Fab
          color="primary"
          aria-label="Edit"
          onClick={this.addUserModal}
          name="newdata"
          className={classes.floatingButton}
        >
          <Icon>add</Icon>
        </Fab>
        <div className="table-custom-options-container">
          <div className="search-container">
            Search
            <div className="searchField">
              <Icon className="searchIcon">search</Icon>
              <input
                id="searchInput"
                label="Search"
                className="searchInput"
                type="text"
                name="search"
                margin="normal"
                value={this.state.search}
                onChange={this.handleSearchChange}
              />
            </div>
          </div>
          <div className="super-select-box">
          <div className="super-select-container">
            User Type
            <Select
              isMulti
              name="filterBy"
              options={filterByOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={this.handleFilterChange}
              value={this.state.filterValue}
            />
          </div>
          <div className="super-select-orderby-container">
            <Icon onClick={this.toggleOrderBy} className={classes.filterIcon}>
              sort
            </Icon>
            <div className="super-select-container">
              Sort By
              <Select
                className="basic-single"
                classNamePrefix="select"
                isSearchable="true"
                name="sortBy"
                options={sortByOptions}
                value={this.state.sortValue}
                onChange={this.handleSortChange}
              />
            </div>
          </div>
          </div>
        </div>
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
              <TableBody>{renderTableBodyElement}</TableBody>
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
                  disabled={!this.state.is_new}
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
          open={this.state.showSnackbar}
          messagecontent={this.state.snackbarMessage}
          autoHideDuration={2000}
        />
      </div>
    );
  }
}

UserManamgent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(UserManamgent);
