import React from "react";
import PropTypes from "prop-types";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import dashboardStyle from "assets/jss/views/dashboardStyle.jsx";
import Button from "components/Button.jsx"

class Settings extends React.Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={6}>
            <Button className="fullwidth-button" color="info" size="lg">
                User Management
            </Button>
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <Button className="fullwidth-button" color="info" size="lg">
                Passage Management
            </Button>
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <Button className="fullwidth-button"  color="info" size="lg">
                Topic Management
            </Button>
          </GridItem>


        </GridContainer>
       </div>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Settings);
