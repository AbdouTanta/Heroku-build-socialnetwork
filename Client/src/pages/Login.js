import styles from "./Login.module.css";
import { useState, useContext, useRef } from "react";
import logo from "../logo.png";
import AuthContext from "../contexts/AuthContext";
import Axios from "axios";

const Login = () => {
    const { auth, setAuth } = useContext(AuthContext);

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);

    const [hasAccount, setHasAccount] = useState(true);
    const [failed, setFailed] = useState(false);

    const loginform = useRef(null);
    const registerform = useRef(null);

    const login = (e) => {
        loginform.current[0].reportValidity();
        e.preventDefault();
        console.log({ email, password });
        Axios.post(
            "/api/login",
            {
                email,
                password,
            },
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res);
                setAuth({ loggedIn: true, userData: res.data.data });
                console.log(auth);
            })
            .catch(() => {
                setFailed(true);
            });
    };

    const register = (e) => {
        registerform.current[0].reportValidity();
        e.preventDefault();
        console.log({ email, password, firstName, lastName });
        Axios.post(
            "/api/register",
            {
                email,
                password,
                firstName,
                lastName,
            },
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res);
                setFailed(true);
                setHasAccount(true);
            })
            .catch(() => {
                setFailed(true);
            });
    };

    const LoginForm = () => {
        return (
            <form ref={loginform} className={styles.form} id="login-form">
                <h1 className={styles.h1}>Login to PeopleBook now!</h1>
                <label className={styles.label}>Email</label>
                <input
                    className={styles.input}
                    name="email"
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => {
                        e.preventDefault();
                        setEmail(e.target.value);
                    }}
                    required
                ></input>
                <label className={styles.label}>Password</label>
                <input
                    className={styles.input}
                    name="password"
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    required
                ></input>
                <button
                    type="submit"
                    className={styles.buttonPrimary}
                    onClick={login}
                >
                    Login
                </button>
                {failed ? <h3>Login failed, try again!</h3> : <></>}
                <div
                    className={styles.buttonSecondary}
                    onClick={() => {
                        setHasAccount(false);
                        setFailed(!failed);
                    }}
                >
                    Don't have an account?
                </div>
            </form>
        );
    };

    const RegisterForm = () => {
        return (
            <form ref={registerform} className={styles.form} id="login-form">
                <h1 className={styles.label}>Register to PeopleBook now!</h1>
                <label className={styles.label}>Email</label>
                <input
                    className={styles.input}
                    name="email"
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    required
                ></input>
                <label className={styles.label}>Password</label>
                <input
                    className={styles.input}
                    name="password"
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    required
                ></input>
                <label className={styles.label}>First Name</label>
                <input
                    className={styles.input}
                    name="firstname"
                    type="text"
                    value={firstName}
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }}
                    required
                ></input>
                <label className={styles.label}>Last Name</label>
                <input
                    className={styles.input}
                    name="lastname"
                    type="text"
                    value={lastName}
                    onChange={(e) => {
                        setLastName(e.target.value);
                    }}
                    required
                ></input>
                <button
                    type="submit"
                    className={styles.buttonPrimary}
                    onClick={register}
                >
                    Register
                </button>
                {failed ? <h3>Register failed, try again!</h3> : <></>}
                <div
                    className={styles.buttonSecondary}
                    onClick={() => {
                        setHasAccount(true);
                        setFailed(!failed);
                    }}
                >
                    You have an account?
                </div>
            </form>
        );
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <img src={logo} width="250"></img>
                <ul className={styles.featureList}>
                    <li className={styles.feature}>
                        Connect with friends from all around the world
                    </li>
                    <li className={styles.feature}>
                        Share you thoughts and interact with others
                    </li>
                    <li className={styles.feature}>
                        Instant chat with your friends
                    </li>
                </ul>
            </div>
            <div className={styles.right}>
                {hasAccount ? LoginForm() : RegisterForm()}
            </div>
        </div>
    );
};

export default Login;
