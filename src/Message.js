import React,{forwardRef} from "react";
import "./Message.css";
const Message = forwardRef(({ username, message},ref) => {
  const isUser = username === message.username;
  return (
    <div ref={ref} className={`message ${isUser&&'message_user'}`}>
      <div className={`content ${isUser?"message_userCard":"message_guestCard"}`}>
        <span className="username">{!isUser&&`${message.username||'Unknown User'}:`}</span>
        <span className="text">{message.message}</span>
      </div>
    </div>
  );
});

export default Message;
