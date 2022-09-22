import { Backdrop, CircularProgress } from "@mui/material";
import { css, StyleSheet } from "aphrodite";
import { useEffect, useState } from "react";
import { selectChatDataState } from "../../../slice/discussionSlice/discussionSlice";
import { useAppSelector } from "../../../store/hooks";
import { socket, SocketContext } from "../../service/socket";
import { UserContext } from "../../service/user";
import { AppState } from "../../tools/enum/app_enum";
import { Chat } from "./Chat";
import { Discussion } from "./Discussion";

export function ChatHome() {
    const chatDataState = useAppSelector(selectChatDataState)
    const [user, setUser] = useState(null);

    useEffect(() => {
        let tempUser = JSON.parse(localStorage.getItem("user")!);
        setUser(tempUser)
    }, []);

    if (user) {
        return (
            <UserContext.Provider value={user}>
                <SocketContext.Provider value={socket}>
                    <div className={css(styles.container)}>
                        <Discussion />
                        <Chat />
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={chatDataState == AppState.loading}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </div>
                </SocketContext.Provider>
            </UserContext.Provider>
        );
    }

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={user === null}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );

}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        height: "100vh"
    }
})