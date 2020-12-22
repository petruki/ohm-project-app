import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import HomeComponent from "./components/home/home.component";
import NavbarComponent from "./components/navbar/navbar.component";
import FooterComponent from "./components/footer/footer.component";
import PlayerStandaloneComponent from "./components/player/player-standalone.component";

const App = () => {
  return (
    <Router>
      <React.Fragment>
        <NavbarComponent />
        <div className="container">
          <Route path="/" exact component={HomeComponent} />
          <Route path="/project/:id" exact component={PlayerStandaloneComponent} />
        </div>
      </React.Fragment>
      <FooterComponent />
    </Router>
  );
}

export default App;
