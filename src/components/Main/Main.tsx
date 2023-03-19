import React, { useEffect, useRef, useState } from "react";
import "./main.css";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import Sidebar from "../Sidebar/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { CircularProgress } from "@mui/material";
import { MainProps, IMessage } from "../Interfaces";

const Main = ({ chatroomName, handleSignOut }: MainProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const messagesQuery = query(
      collection(db, "messages"),
      where("chatroomName", "==", chatroomName),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
      const messages: IMessage[] = [];

      querySnapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() } as IMessage);
      });

      setMessages(messages);
      setLoading(true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const addMessage = async () => {
    await addDoc(collection(db, "messages"), {
      text: newMessage,
      sender: user?.displayName,
      chatroomName,
      createdAt: serverTimestamp(),
      uid: user?.uid,
    });

    setNewMessage("");
  };

  const isInputEmpty = () => {
    return newMessage.trim() === "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isInputEmpty()) {
      addMessage();
    }
  };

  if (!loading) {
    return (
      <div className="loading">
        <CircularProgress />
      </div>
    );
  }

  const handleSendClick = async () => {
    if (!isInputEmpty()) {
      addMessage();
    }
  };

  return (
    <div className="main">
      <div className="main_box">
        <Sidebar handleSignOut={handleSignOut} />
        <div className="main_message">
          {messages &&
            messages.map((message) => (
              <div
                key={message.id}
                className={`messages_${
                  message.uid === user?.uid ? "sent" : "received"
                }`}
              >
                <p
                  className={`message_${
                    message.uid === user?.uid ? "sent" : "received"
                  }_name`}
                >
                  {message.sender.split(" ")[0]}
                </p>
                <p
                  className={`message_${
                    message.uid === user?.uid ? "sent" : "received"
                  }_text`}
                >
                  {message.text}
                </p>
              </div>
            ))}
          <div ref={messagesEndRef} />
          <form onSubmit={handleSubmit}>
            <input
              className="chat_input"
              type="text"
              placeholder="Enter Message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <ArrowForwardIcon
              className="send_arrow"
              sx={{ height: "40px", width: "40px" }}
              onClick={handleSendClick}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Main;
