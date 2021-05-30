import "./message.css";
import { format } from "timeago.js";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function Message({ message, own }) {
  // console.log(message);
  const [details, setDetails] = useState("");
  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await axios.get(`/users/${message.sender}/details`);
        setDetails(res.data);
      } catch (err) {}
    };
    getDetails();
  }, []);
  return (
    <div className={own ? "message own" : "message"}>
      <div className={own ? "messageTop own" : "messageTop"}>
        <img
          className={own ? "messageImg own " : "messageImg "}
          src={details ? details.profilePicture : ""}
          alt=""
        />
        <p
          className={
            /[a-zA-z0-9]/.test(message.text) ? "messageText" : "messageEmoji"
          }
        >
          {message.text}
        </p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
