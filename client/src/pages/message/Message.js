import "./message.css";
import Conversation from "../../components/conversation/Convo";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { io } from "socket.io-client";
import Navbar from "../../components/navbar/Navbar";
import Picker from "emoji-picker-react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, InsertEmoticon, Mic } from "@material-ui/icons";
export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      convoId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [messages]);

  // react emoji

  const Emojis = () => (
    <OverlayTrigger
      trigger="click"
      placement="top"
      overlay={popover}
      delay={{ show: 50, hide: 100 }}
    >
      <IconButton>
        <InsertEmoticon />
      </IconButton>
    </OverlayTrigger>
  );
  const onEmojiClick = (event, emojiObject) => {
    event.preventDefault();
    console.log(emojiObject.emoji);
    setNewMessage(newMessage + emojiObject.emoji);
  };
  const popover = (
    <Popover style={{ width: "500px" }}>
      <Popover.Content>
        <Picker onEmojiClick={onEmojiClick} disableAutoFocus={true} />
      </Popover.Content>
    </Popover>
  );
  return (
    <>
      <Navbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <form
                    className="chatForm"
                    required
                    action="submit"
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <input
                      required
                      className="chatMessageInput"
                      placeholder="type something..."
                      onChange={(e) =>
                        e.target.value.length !== 0 || "  "
                          ? setNewMessage(e.target.value.trimLeft())
                          : false
                      }
                      value={newMessage}
                      type="text"
                    />
                    <Emojis />
                    <button
                      type="submit"
                      className="chatSubmitButton"
                      onClick={newMessage !== "" ? handleSubmit : false}
                    >
                      Send
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}
