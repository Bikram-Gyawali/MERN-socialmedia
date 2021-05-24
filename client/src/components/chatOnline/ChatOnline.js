import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/friends/" + currentId);
      console.log(res.data);
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    console.log(currentId);
    try {
      const res = await axios.get(
        `/conversations/find/${currentId}/${user._id}`
      );
      console.log("clivked", res.data);
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((active) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(active)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={active?.profilePicture ? active.profilePicture : ""}
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{active?.username}</span>
        </div>
      ))}
    </div>
  );
}
