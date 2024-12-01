import React from "react";
import ReactLogo from "./assets/react.svg?component";
import ReactLogoIcon from "./assets/react.svg?icon";

import "./App.css";

function App() {
  return (
    <div className="App">
      <div>
        <ReactLogo className="logo" />
        <ReactLogoIcon />
      </div>
    </div>
  );
}

export default App;
