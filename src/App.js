import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import ViewDepartmentsComponent from "./components/view-departments.component";

const App = () => {
  return (
    <Router>
      <React.Fragment>
        <div className="container">
          <Route path="/" exact component={ViewDepartmentsComponent} />
        </div>
      </React.Fragment>
      <footer className="footer">
          <div className="container text-center">
              <span className="text-muted">Created by Roger Floriano - 2020</span>
          </div>
      </footer>
    </Router>
  );
}

export default App;
