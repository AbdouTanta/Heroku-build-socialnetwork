import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Profil from "./pages/profil.js";
import Main from "./pages/Main";
import Login from "./pages/Login.js";
import AuthContext from "./contexts/AuthContext";

import { Provider } from "react-redux";
import store from "./store/index";
import Axios from "axios";
import axios from "axios";

function App() {
    // here we should check if a user is logged in from the cookie

    useEffect(() => {
        Axios.get("/api/users/auth", {
            withCredentials: true,
        })
            .then((res) => {
                setAuth({ loggedIn: true, userData: res.data.data });
                setLoading(false);
            })
            .catch(() => {
                setAuth({ ...auth, loggedIn: false });
                setLoading(false);
            });
    }, []);

    const [loading, setLoading] = useState(true);

    const [auth, setAuth] = useState({
        loggedIn: false,
        userData: {},
    });

    return (
        <Provider store={store}>
            <AuthContext.Provider value={{ auth, setAuth }}>
                <Router>
                    <div>
                        <div>
                            <Route path="/">
                                {loading ? (
                                    <div className="loading">Loading...</div>
                                ) : auth.loggedIn ? (
                                    <Main />
                                ) : (
                                    <Login />
                                )}
                            </Route>
                            <Route path="/login" component={Login} />
                        </div>
                    </div>
                </Router>
            </AuthContext.Provider>
        </Provider>
    );
}

export default App;
