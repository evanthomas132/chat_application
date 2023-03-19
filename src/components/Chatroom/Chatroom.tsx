import React from "react";
import "./chatroom.css";
import { useNavigate } from "react-router-dom";
import { ChatroomProps } from "../Interfaces";

const Chatroom = ({
  chatroomName,
  setChatroomName,
  setIsChatroom,
  handleSignOut,
}: ChatroomProps) => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsChatroom(true);
    navigate(`/chat/${chatroomName}`);
  };

  return (
    <div className="chat_room">
      <div className="chatroom_box">
        <h1>ChatRoom</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Chatroom..."
            value={chatroomName}
            onChange={(e) => setChatroomName(e.target.value)}
          />
          <button type="submit">Enter Chatroom</button>
          <button onClick={handleSignOut}>Sign Out</button>
        </form>
      </div>
    </div>
  );
};

export default Chatroom;
