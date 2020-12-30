import React from "react";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import HomeComponent from "./components/home/home.component";
import NavbarComponent from "./components/navbar/navbar.component";
import FooterComponent from "./components/footer/footer.component";
import ProjectStandaloneComponent from "./components/project/project-standalone.component";

const App = () => {
  return (
    <div>
      <NavbarComponent />
      <div className="container">
        <Switch>
          <Route exact path="/" component={HomeComponent} />
          <Route path="/project/:id" component={ProjectStandaloneComponent} />
        </Switch>
      </div>
      <FooterComponent />
    </div>
  );
}

export default App;
