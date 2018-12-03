import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Icon from "@material-ui/core/Icon";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import dashboardStyle from "assets/jss/views/dashboardStyle.jsx";
import Button from "components/Button.jsx";

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
            <Card>
              <CardHeader color="primary" stats icon>
                <CardIcon color="primary">
                  <Icon>folder</Icon>
                </CardIcon>
                <div className={classes.cardTitle }>
                <h3 >
                Question Folder Management
                </h3>
                <p>
                Manage folders to which questions belong
                </p>
                </div>
              </CardHeader>
              {/* <CardBody>
                <p>Manage users/user-roles of the dashboard. </p>
              </CardBody> */}
              <CardFooter>
              <Button className={classes.settingsbutton} color="info" size="lg">
                Select
              </Button>
              </CardFooter>  
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <Card>
              <CardHeader color="primary" stats icon>
                <CardIcon color="primary">
                  <Icon>sort</Icon>
                </CardIcon>
                <div className={classes.cardTitle }>
                <h3 >
                Topic Management
                </h3>
                <p>
                Manage topics under which various questions belong
                </p>
                </div>
              </CardHeader>
              {/* <CardBody>
                <p>Manage users/user-roles of the dashboard. </p>
              </CardBody> */}
              <CardFooter>
              <Button className={classes.settingsbutton} color="info" size="lg">
                Select
              </Button>
              </CardFooter>  
            </Card>
          </GridItem>
          </GridContainer>
        <GridContainer>
      
          <GridItem xs={12} sm={6} md={6}>
            <Card>
                <CardHeader color="primary" stats icon>
                  <CardIcon color="primary">
                    <Icon>speaker_notes</Icon>
                  </CardIcon>
                  <div className={classes.cardTitle }>
                  <h3 >
                  Profile Management
                  </h3>
                  <p>
                  Manage test profiles and their instructions
                  </p>
                  </div>
                </CardHeader>
                {/* <CardBody>
                  <p>Manage users/user-roles of the dashboard. </p>
                </CardBody> */}
                <CardFooter>
                <Button className={classes.settingsbutton} color="info" size="lg">
                  Select
                </Button>
                </CardFooter>  
              </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <Card>
              <CardHeader color="primary" stats icon>
                <CardIcon color="primary">
                  <Icon>folder</Icon>
                </CardIcon>
                <div className={classes.cardTitle }>
                <h3 >
                Test Folder Management
                </h3>
                <p>
                Manage folders to which tests belong
                </p>
                </div>
              </CardHeader>
              {/* <CardBody>
                <p>Manage users/user-roles of the dashboard. </p>
              </CardBody> */}
              <CardFooter>
              <Button className={classes.settingsbutton} color="info" size="lg">
                Select
              </Button>
              </CardFooter>  
            </Card>
          </GridItem>


        </GridContainer>
         <GridContainer>
      
          <GridItem xs={12} sm={6} md={6}>
            <Card>
              <CardHeader color="primary" stats icon>
                <CardIcon color="primary">
                  <Icon>people</Icon>
                </CardIcon>
                <div className={classes.cardTitle }>
                <h3 >
                  Team Management
                </h3>
                <p>
                Manage team users/roles of the dashboard. 
                </p>
                </div>
              </CardHeader>
              {/* <CardBody>
                <p>Manage users/user-roles of the dashboard. </p>
              </CardBody> */}
              <CardFooter>
              <Link className={classes.settingsbutton} to='/adminpanel/settings/users'>
                <Button className={classes.settingsbutton} color="info" size="lg">
                  Select
                </Button>
              </Link>
              </CardFooter>  
            </Card>
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
