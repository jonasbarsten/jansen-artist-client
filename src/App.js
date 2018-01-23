import React, { Component } from "react";
import Routes from "./Routes";

import FrontNav from './components/navigation/FrontNav';

class App extends Component {
  render() {
    return (
      <div>
        <FrontNav />
        <Routes />
      </div>
    );
  }
}

export default App;