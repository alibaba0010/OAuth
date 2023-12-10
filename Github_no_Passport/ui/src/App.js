import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const GITHUB_CLIENT_ID = "f04813941fc4ea88d8c7";
const gitHubRedirectURL = "http://localhost:4000/api/v1/auth/github";
const path = "/";

console.log("Hello");
function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    (async function () {
      const usr = await axios
        .get(`http://localhost:4000/api/v1/me`, {
          withCredentials: true,
        })
        .then((res) => res.data);

      setUser(usr);
    })();
  }, []);

  return (
    <div className="App">
      {!user ? (
        <a
          href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${gitHubRedirectURL}?path=${path}&scope=user:email`}
        >
          LOGIN WITH GITHUB
        </a>
      ) : (
        <h1>Welcome {user.login}</h1>
      )}
    </div>
  );
}

export default App;
