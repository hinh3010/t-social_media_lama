import React, { useContext } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { AuthContext } from "./context/auth/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Messenger from "./pages/messenger/Messenger";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";

const routes = [
    { path: "/", component: Home },
    { path: "/profile", component: Profile },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
]

function App() {
    const { user } = useContext(AuthContext)
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    {user ? <Home /> : <Redirect to="/login" />}
                </Route>
                <Route path="/login">
                    {user ? <Redirect to="/" /> : <Login />}
                </Route>
                <Route path="/register">
                    {user ? <Redirect to="/" /> : <Register />}
                </Route>
                <Route path="/messenger">
                    {!user ? <Redirect to="/login" /> : <Messenger />}
                </Route>
                <Route path="/profile/:username" >
                    {user ? <Profile /> : <Redirect to="/login" />}
                </Route>
                {/* {
                    routes.map((route, i) => (
                        <Route
                            key={i} exact
                            path={route.path}
                            component={route.component}
                        />
                    ))
                } */}
            </Switch>
        </BrowserRouter>
    );
}

export default App;
