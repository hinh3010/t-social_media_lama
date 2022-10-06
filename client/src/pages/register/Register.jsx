import { CircularProgress } from "@material-ui/core";
import { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { apiRegister } from "../../api";
import "./register.css";

export default function Register() {

    const username = useRef()
    const email = useRef()
    const password = useRef()
    const passwordAgain = useRef()
    const history = useHistory()

    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password.current.value.trim() !== passwordAgain.current.value.trim()) {
            passwordAgain.current.setCustomValidity("Passwords don't match!")
            alert("Passwords don't match!")
        } else {
            const payload = {
                username: username.current.value.trim(),
                email: email.current.value.trim(),
                password: password.current.value.trim(),
            }
            setLoading(true)
            const { res, err } = await apiRegister(payload)
            setLoading(false)
            if (res && !err) {
                history.push('/login')
            } else {
                alert(err.message)
            }

        }
        // apiLogin(payload, dispatch)
    }

    // console.log({ error, user })

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Hello cacbantre</h3>
                    <span className="loginDesc">
                        Kết nối với bạn bè và thế giới xung quanh bạn trên Hellocacbantre.
                    </span>
                </div>
                <form onSubmit={handleSubmit} className="loginRight">
                    <div className="loginBox">
                        <input
                            placeholder="User name"
                            className="loginInput"
                            ref={username}
                            required
                        />
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
                        <input
                            placeholder="Password Again"
                            className="loginInput"
                            type="passwordAgain"
                            ref={passwordAgain}
                            required
                        />

                        <button type="submit" className="loginButton" onClick={
                            () => passwordAgain.current.setCustomValidity('')
                        }>
                            {loading ? <CircularProgress size="20px" color="secondary" /> : "Sign Up"}
                        </button>
                        <button
                            className="loginRegisterButton"
                            onClick={e => e.stopPropagation()}
                        >
                            <Link to="login">
                                Login to Account
                            </Link>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
