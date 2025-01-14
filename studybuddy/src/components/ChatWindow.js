import React, { useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import Header from "./Header";
import axios from "axios";
import "./ChatWindow.css";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (text) => {
    const userMessage = { text, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    setIsTyping(true);

    try {
      const response = await axios.post("http://localhost:3001/doubt", {
        ask: text,
      });

      // Process and format the response from the API
      const formattedResponse = formatResponse(response.data.answer);

      // Simulate a typing delay and show formatted response
      setTimeout(() => {
        const botMessage = { text: formattedResponse, sender: "bot" };
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      setTimeout(() => {
        const botMessage = { text: "Error connecting to the server.", sender: "bot" };
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const formatResponse = (responseText) => {
    // Convert markdown-like syntax to HTML elements
    let formattedText = responseText;

    // Bold text - **bold**
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Italics text - *italic*
    formattedText = formattedText.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Links - [link](url)
    formattedText = formattedText.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank">$1</a>'
    );

    return formattedText;
  };

  return (
    <div className="chat-window">
      <Header />
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <ChatMessage key={index} text={msg.text} sender={msg.sender} />
        ))}
        {isTyping && <ChatMessage text="Typing..." sender="bot" />}
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
