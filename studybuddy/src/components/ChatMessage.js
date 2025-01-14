import React from "react";
import "./ChatMessage.css";

const ChatMessage = ({ text, sender }) => {
  return (
    <div className={`chat-message ${sender}`}>
      <div className="message-bubble" dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
};

export default ChatMessage;
