import React from "react";
import {
  Search,
  Person,
  Chat,
  Notifications,
  Timeline,
} from "@material-ui/icons";
import HomeIcon from "@material-ui/icons/Home";
import "./navbar.css";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
function Navbar() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">Hello</span>
          </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <IconButton>
              <Search className="searchIcon" />
            </IconButton>
            <input
              type="text"
              placeholder="search for post friends"
              className="searchInput"
            />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <span className="topbarLink">
              <Link to="/">
                <IconButton>
                  <HomeIcon />
                </IconButton>
              </Link>
            </span>
            <span className="topbarLink">
              <Link to="/timeline">
                <IconButton>
                  <Timeline />
                </IconButton>
              </Link>
            </span>
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <Link to="/profile/:profileId">
                <IconButton>
                  <Person />
                </IconButton>
              </Link>
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <Link to="/message">
                <IconButton>
                  <Chat />
                </IconButton>
              </Link>
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <Link to="/notifications/:userId">
                <IconButton>
                  <Notifications />
                </IconButton>
              </Link>
              <span className="topbarIconBadge">1</span>
            </div>
          </div>
          <Link to={`/profile/${user.username}`}>
            <img
              src={user.profilePicture ? user.profilePicture : ""}
              className="topbarImg"
              alt=""
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
