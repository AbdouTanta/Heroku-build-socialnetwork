import styles from "./Main.module.css";
import { FaSignOutAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "../components/main/Sidebar";
import MobileMenu from "../components/main/MobileMenu";
import { useState, useEffect, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import NewPost from "../components/main/NewPost";
import AuthContext from "../contexts/AuthContext";
import Post from "../components/main/post";
import Axios from "axios";
import logo from "../logo.png";

import Profilcard from "../components/profil/profil-card";
import Aboutme from "../components/profil/aboutme";
import Friends from "../components/profil/friends";

import Chat from "../components/chat/chat";

import { ConversationsProvider } from "../contexts/ConversationsProvider";

export function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => {
            setMatches(media.matches);
        };
        media.addListener(listener);
        return () => media.removeListener(listener);
    }, [matches, query]);

    return matches;
}

const Main = () => {
    useEffect(() => {
        makeUserOnline(auth.userData.id, true);
    }, []);

    const { auth, setAuth } = useContext(AuthContext);
    const id = auth.userData.id;
    let mobile = useMediaQuery("(max-width: 700px)");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(
        (mobile) => {
            if (!mobile) setIsOpen(false);
        },
        [mobile]
    );

    useEffect(() => {
        if (isOpen) window.scrollTo(0, 0);
    }, [isOpen]);

    const logout = () => {
        Axios.get("/api/logout", {
            withCredentials: true,
        }).then(() => {
            makeUserOnline(auth.userData.id, false);
            setAuth({ loggedIn: false, userData: {} });
        });
    };

    //change user visbility if online

    function makeUserOnline(id, isOnline) {
        Axios.put(
            `/api/user/${id}/isOnline`,
            {
                isOnline: isOnline,
            },
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <nav className={styles.nav}>
                    <img src={logo} height="25" className={styles.logo}></img>
                    <input
                        type="text"
                        name="search"
                        placeholder="search for users"
                        className={styles.search}
                    />
                    {!mobile ? (
                        <div className={styles.logout} onClick={logout}>
                            <FaSignOutAlt className={styles.iconLogout} />
                            <div>Logout</div>
                        </div>
                    ) : (
                        <div
                            className={styles.menu}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <GiHamburgerMenu
                                className={styles.iconMenu}
                                size={28}
                            />
                        </div>
                    )}
                </nav>
                <nav className={styles.navMobile}>
                    <input
                        type="text"
                        name="search"
                        placeholder="search for users"
                        className={styles.searchMobile}
                    />
                </nav>
                {isOpen ? <MobileMenu id={id} /> : null}

                <div className={styles.grid}>
                    <div className={styles.profile}>
                        <Sidebar id={id} />
                    </div>
                    <div className={styles.main}>
                        <div className={styles.content}>
                            <Switch>
                                <Route path="/" exact>
                                    <NewPost id={id} />
                                    <Post id={id} />
                                </Route>
                                <Route path="/friends" exact>
                                    <Friends id={id} />
                                </Route>
                                <Route path="/myprofil" exact>
                                    <Profilcard id={id} />
                                </Route>
                                <Route path="/chat" exact>
                                    <Chat />
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
