import "./index.css";
import Login from "./components/Login/Login";
import Chatroom from "./components/Chatroom/Chatroom";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { signOut } from "firebase/auth";
import Main from "./components/Main/Main";
import Cookies from "universal-cookie";
import { auth } from "./components/firebase/firebase";
import { useNavigate } from "react-router-dom";
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [chatroomName, setChatroomName] = useState<string | null>(null);
  const [isChatroom, setIsChatroom] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setChatroomName(null);
    navigate("/");
  };

  if (isLoading) {
    return (
      <div>
        <CircularProgress
          sx={{ color: "white", position: "absolute", top: "50%", left: "50%" }}
        />
      </div>
    );
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/chatroom"
          element={
            <Chatroom
              chatroomName={chatroomName ?? ""}
              setChatroomName={setChatroomName}
              setIsChatroom={setIsChatroom}
              handleSignOut={handleSignOut}
            />
          }
        />
        <Route
          path="/chat/:chatroomName"
          element={
            <Main
              chatroomName={chatroomName ?? ""}
              handleSignOut={handleSignOut}
            />
          }
        />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
