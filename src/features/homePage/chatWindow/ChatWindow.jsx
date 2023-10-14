import React, { useEffect, useState } from "react";

const ChatWindow = ({
  socket,
  messages,
  inputText,
  setMessages,
  setInputText,
}) => {
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== "") {
      const newChatMessage = { text: inputText, sender: "user" };
      //sending message to server
      if (socket) {
        socket.emit("message", newChatMessage);
      }

      // setMessages([...messages, { text: inputText, sender: "user" }]);
      setInputText("");
    }
  };

  //   useEffect(() => {
  //     // Listen for incoming messages from the server
  //     if (socket) {
  //       socket.on('message', (message) => {
  //         setMessages((prevMessages) => [...prevMessages, message]);
  //       });
  //     }
  //   }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.sender === "user" ? "user-message" : "bot-message"
            }
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
