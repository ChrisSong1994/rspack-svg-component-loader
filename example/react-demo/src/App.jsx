import React from "react";
import ReactLogo from "./assets/react.svg?component";
import ReactLogoIcon from "./assets/react.svg?icon";
import LogoContent from "./assets/react.svg";

import "./App.css";

function App() {
  return (
    <div className="App">
      <div>
        <ReactLogo className="logo" />
        <ReactLogoIcon />
        <img width="100" height="100" alt="react logo" src={LogoContent} />
        {/* jsx img src relative path cant be resolved */}
        {/* <img
          width="100"
          height="100"
          alt="react logo"
          src="./assets/react.svg"
        /> */}
      </div>
    </div>
  );
}

export default App;
