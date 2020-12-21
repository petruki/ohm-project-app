import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import HomeComponent from "./components/home.component";
import PlayerComponent from "./components/player.component";
import NavbarComponent from "./components/navbar.component";
import FooterComponent from "./components/footer.component";

const App = () => {
  return (
    <Router>
      <React.Fragment>
        <NavbarComponent />
        <div className="container">
          <Route path="/" exact component={HomeComponent} />
          <Route path="/project/:id" exact component={PlayerComponent} />
        </div>
      </React.Fragment>
      <FooterComponent />
    </Router>
  );
}

export default App;
