import React from "react";
import logo from "./logo.svg";
import github from "./github";
import "./App.css";

// const GITHUB_CLIENT_ID = "f04813941fc4ea88d8c7";
// const gitHubRedirectURL = "http://localhost:4000/api/v1/auth/github";
// const path = "/";

function App() {
  // const [user, setUser] = useState();

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
    </div>
  );
}
export default App;
