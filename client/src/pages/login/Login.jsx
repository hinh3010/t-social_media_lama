import { CircularProgress } from "@material-ui/core";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { apiLogin } from "../../api";
import { AuthContext } from "../../context/auth/AuthContext";
import "./login.css";

export default function Login() {

    const { dispatch, error, isFetching, user } = useContext(AuthContext)

    const email = useRef()
    const password = useRef()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            email: email.current.value.trim(),
            password: password.current.value.trim(),
        }
        await apiLogin(payload, dispatch)
    }


    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Hello cacbantre</h3>
                    <span className="loginDesc">
                        Kết nối với bạn bè và thế giới xung quanh bạn trên Hello cacbantre.
                    </span>
                </div>
                <div className="loginRight">
                    <form onSubmit={handleSubmit} className="loginBox">

                        <input
                            placeholder="Email"
                            className="loginInput"
                            type="email"
                            ref={email}
                            required
                        />
                        <input
                            placeholder="Password"
                            className="loginInput"
                            type="password"
                            ref={password}
                            required
                        />

                        <button type="submit" className="loginButton" disabled={isFetching}>
                            {isFetching ? <CircularProgress size="20px" color="secondary" /> : "Login"}
                        </button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button
                            className="loginRegisterButton"
                            onClick={e => e.stopPropagation()}

                        >
                            <Link to="register" >
                                Create a New Account
                            </Link>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
