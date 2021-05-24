import React from "react";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import "./follow.css";
function Follow({ user }) {
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );
  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user?._id}/follow`, {
          userId: currentUser?._id,
        });
        dispatch({ type: "FOLLOW", payload: user?._id });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {user.username !== currentUser.username && (
        <button onClick={handleClick} className="rightbarFollow">
          {followed ? "Unfollow - " : "Follow +"}
        </button>
      )}
    </div>
  );
}

export default Follow;
