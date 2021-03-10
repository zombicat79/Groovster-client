import io from "socket.io-client";
import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import { withAuth } from "./../../context/auth-context";
import { Link } from "react-router-dom";
import userService from "./../../services/user-service";

let socket;
let chatId;

const ChatRoom = (props) => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const dummy = useRef();
  const username = props.user.username;

  // Find the chat's params & make the conditionnal (chatParams === text.chatId )
  // const {idChat} = props.match.params;
  // console.log("idChat", idChat);
  

  userService
    .getUser(props.user._id)
    .then((data) => {
      chatId = data.chat;
      console.log(data.chat);
    })
    .catch((err) => console.log(err));

  // run when the component mounts
  useEffect(() => {
    socket = io(process.env.REACT_APP_API_URL, {
      transports: ["websocket", "polling"],
      forceNew: true,
    });

    //   socket.on('reconnect', function() {
    //     socket.emit("username", username);
    //     setIsReady(true);
    // });

    socket.on("connect", () => {
      socket.emit("username", username);
      setIsReady(true);
    });

    socket.on("users", (users) => {
      setUsers(users);
    });

    socket.on("message", (message) => {
      console.log("message", message);
      // setMessages((messages) => [...messages, message]);
      setMessages((messages) => [...messages, message]);

    });

    socket.on("connected", (user) => {
      console.log("user", user);

      setUsers((users) => [...users, user]);
    });

    socket.on("disconnected", (id) => {
      setUsers((users) => {
        return users.filter((user) => user.id !== id);
      });
    });

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    // clean up and disconnect the user before the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  const submit = (event) => {

    console.log("chat Sent", chatId);


    event.preventDefault();
    socket.emit("send", ({message, chatId}));
    setMessage("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="chat-container">
      <div className="row">
        <div className="col-md-12 mt-4 mb-4"></div>
      </div>

      <div className="col-md-4">
        <h4>{users.length} fans connected.</h4>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div id="messages">
            {messages.map(({ user, date, text }, index) => (
              <div
                key={index}
                className={`${
                  user.name === username
                    ? "message-display sender"
                    : "message-display receiver"
                }`}
              >
                <p>CHATID: {text.chatId}</p>
                <div className="col-md-3">
                  <span className="time-chat">
                    {moment(date).format("h:mm")}{" "}
                  </span>
                  {/* {`${user.name === username ? "" : user.name}`} */}

                  {user.name !== username && (
                    <Link to={`/profile/${user.name}`}>
                      <span className="name-link">{user.name}</span>
                    </Link>
                  )}
                </div>
                <div className="col-md-2">{text.message}</div>
              </div>
            ))}
            <span ref={dummy} className="dummy"></span>
          </div>
          <form onSubmit={submit} id="form">
            <div className="input-group">
              <input
                disabled={!isReady}
                type="text"
                className="form-control"
                onChange={(e) => setMessage(e.currentTarget.value)}
                value={message}
                autoComplete="off"
                id="text"
              />
              <span className="input-group-btn">
                <button
                  disabled={!isReady}
                  id="submit"
                  type="submit"
                  className="btn btn-primary send-chat"
                >
                  🕊️
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withAuth(ChatRoom);
