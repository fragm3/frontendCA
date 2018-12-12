import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/css/material-dashboard-react.css?v=1.5.0";

import indexRoutes from "routes/index.jsx";

const hist = createBrowserHistory();

class FinalApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  };

  render() {
    return (
      <Router history={hist}>
        <Switch>
          {indexRoutes.map((prop, key) => {
            return <Route path={prop.path} component={prop.component} key={key} />;
          })}
        </Switch>
      </Router>
    );
  }
}

export default FinalApp;

ReactDOM.render(<FinalApp />,
  document.getElementById("root")
);
