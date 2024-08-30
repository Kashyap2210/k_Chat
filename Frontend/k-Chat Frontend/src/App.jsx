import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";

let socket;
const CONNECTION_PORT = "localhost:3000";

function App() {
  // States that exists before login
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState();

  // States that exists after login
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, []); // Correct usage with an empty dependency array

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      console.log(data);
      setMessageList([...messageList, data]);
    });
  });

  const connectToRoom = () => {
    console.log(room);
    socket.emit("join_room", room);
    setLoggedIn(true);
  };

  const send_message = async () => {
    let messageContent = {
      room: room,
      content: {
        author: username,
        message: message,
      },
    };
    await socket.emit("send_message", messageContent);
    setMessageList((prevList) => [...prevList, messageContent.content]);
    setMessage("");
  };

  return (
    <div className="Grand_Container">
      <div className="Main_Heading">k-Chat</div>
      <div className="App">
        {!loggedIn ? (
          <div className="logIn">
            <div className="inputs">
              <input
                type="text"
                placeholder="Name..."
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Room..."
                value={room}
                onChange={(e) => {
                  setRoom(e.target.value);
                }}
              />
            </div>
            <div className="button_div">
              <button className="Button" onClick={connectToRoom} type="submit">
                Enter Chat
              </button>
            </div>
          </div>
        ) : (
          <div className="Chat_Container">
            {/* <h1>{room}</h1> */}
            <div className="Messages">
              <div className="Room_Name">{room}</div>
              {messageList.map((value, key) => {
                return (
                  <div
                    className={`messageContainer ${
                      value.author === username ? "you" : "other"
                    }`}
                    key={key}
                  >
                    <div className="messageAuthor">{value.author}</div>
                    <div className="message">{value.message}</div>
                  </div>
                );
              })}
            </div>
            <div className="MessagesInputs">
              <input
                type="text"
                placeholder="Message..."
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
              <button type="submit" onClick={send_message}>
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
