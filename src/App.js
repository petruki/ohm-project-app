import React from "react";
import { BrowserRouter, BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import HomeComponent from "./components/home/home.component";
import NavbarComponent from "./components/navbar/navbar.component";
import FooterComponent from "./components/footer/footer.component";
import ProjectStandaloneComponent from "./components/project/project-standalone.component";

const App = () => {
  return (
    <Router>
      <React.Fragment>
        <NavbarComponent />
        <div className="container">
          <BrowserRouter basename="/ohm-project-app">
            <Route exact path="/" component={HomeComponent} />
            <Route exact path="/project/:id" component={ProjectStandaloneComponent} />
          </BrowserRouter>
        </div>
      </React.Fragment>
      <FooterComponent />
    </Router>
  );
}

export default App;
