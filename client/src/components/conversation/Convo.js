import axios from "axios";
import { useEffect, useState } from "react";
import "./convo.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find(
      (memb) => memb !== currentUser._id
    );

    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={user?.profilePicture ? user.profilePicture : ""}
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}
