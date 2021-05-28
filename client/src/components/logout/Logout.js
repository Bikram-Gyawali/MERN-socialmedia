import React from "react";
import { IconButton } from "@material-ui/core";
import "./logout.css";

import { Link, Redirect, useHistory } from "react-router-dom";
// import { useState } from "react";
import { ExitToApp } from "@material-ui/icons";
function Logout() {
  let history = useHistory();
  //   const [loggedState, setLoggedState] = useState(false);

  const logout = (e) => {
    e.preventDefault();
    localStorage.clear("token");
    // setLoggedState(true);
    history.push("/login");
    window.location.reload();
  };

  return (
    <div>
      {/* {loggedState ? (
        <Redirect to="/login" push={true} />
      ) : ( */}
      <Link to="/">
        <IconButton onClick={logout}>
          <ExitToApp />
        </IconButton>
      </Link>
      {/* )} */}
    </div>
  );
}

export default Logout;
