import "./login.css";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { auth, provider } from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import Cookies from 'universal-cookie'
import {useNavigate} from 'react-router-dom'
const Login = () => {

  const cookies = new Cookies()
  const navigate = useNavigate()

  const googleSignIn = async () => {
    const result = await signInWithPopup(auth, provider)
    cookies.set("auth-token", result.user.refreshToken)
    navigate('/')


  };
  return (
    <div className="login">
      <div className="login_box">
        <h1>Login Here</h1>
        <form>
          <Button onClick={googleSignIn}>
            <GoogleIcon />
            Sign in with Google
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
