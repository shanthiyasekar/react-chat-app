import "./App.css";
import React, { useEffect, useState } from "react";
import { Button, FormControl, Input, InputLabel } from "@mui/material";
import Message from "./Message";
import { db } from "./firebase";
import { getDocs, collection,addDoc, orderBy,query } from "firebase/firestore";
import FlipMove from 'react-flip-move';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
function App() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([]);
  const [username, setUsername] = useState("");
  const [promptShown, setPromptShown] = useState(false);
  const chats = collection(db, "messages");
  useEffect(() => {
    const getChats = async () => {
      try {
        const data = await getDocs(query(chats,orderBy('timestamp','desc')));
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),id:doc.id,
        }));
        setMessage(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getChats();
  }, []);
  useEffect(() => {
  
    if (username === "" && !promptShown) {
      const enteredUsername = window.prompt("Please enter your name");
      if (enteredUsername) {
        setUsername(enteredUsername);
      }
      setPromptShown(true);
    }
  }, [username, promptShown]); // Add username and promptShown as dependencies

  const sendMessage = async (e) => {
    e.preventDefault();
    const timestamp = new Date();
    await addDoc(chats, { message: input, username: username, timestamp: timestamp });
    setMessage([{ username: username, message: input, timestamp: timestamp }, ...message]);
    setInput("");
  };

  return (
    <div className="App">
      <h1>Messenger App</h1>
      <h2>Hi {username}</h2>
      <form className="app__form">
        <FormControl className="app__formControl">
          <Input className="app__input" placeholder="Enter the message" value={input} onChange={(e) => setInput(e.target.value)} />
          <IconButton className="app__iconButton"
            disabled={!input}
            variant="contained"
            type="submit"
            onClick={sendMessage}
          >
            <SendIcon/>
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
         {message.map((m) => (
        <Message key={m.id} username={username} message={m}/>
      ))}
      </FlipMove>
     
    </div>
  );
}

export default App;
