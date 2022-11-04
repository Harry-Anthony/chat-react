import { User } from "../../../models/i_user"
// import styles from '../Home.module.css';
import { css, StyleSheet } from 'aphrodite';

import boy from '../../../assets/boy.png'
import { selectFriend, selectFriendForDiscussion } from "../../../slice/discussionSlice/discussionSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useContext } from "react";
import { SocketContext } from "../../../refact/service/socket";
import { UserContext } from "../../../refact/service/user";
import { Avatar } from "@mui/material";

interface searchResultProps {
    friend: User;
}

export function SearchResult(props: searchResultProps) {
    const dispatch = useAppDispatch();
    const friend = useAppSelector(selectFriend);
    const user = useContext(UserContext);
    const socket = useContext(SocketContext)


    return (
        <div className={friend && props.friend._id === friend._id ? css(styles.container, styles.backgroundSelect) : css(styles.container)} onClick={() => {
            if (friend && friend._id != props.friend._id) {
                socket.removeListener(`message:create:${user._id}:${friend._id}`);
                dispatch(selectFriendForDiscussion(props.friend))
            } else if (!friend) {
                dispatch(selectFriendForDiscussion(props.friend))
            }
        }}>
            <div className={css(styles.avatar_circle)}>
                {/* <div className={styles.status_circle}></div> */}
                {/* <img src={props.friend.avatar ?? boy} className={styles.avatar} /> */}
                <Avatar />
            </div>
            <div className={css(styles.message)}>{props.friend.name}</div>

            {/* <span
                className={styles.user_name}>{props.friend.name}</span> */}
        </div>
    );
}


const styles = StyleSheet.create({
    container: {
        height: "100px",
        margin: "0px 0px",
        padding: "10px 10px",
        maxHeight: "100px",
        maxWidth: "max-content",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        minWidth: "100%",
        cursor: "pointer"
    },
    backgroundSelect: {
        backgroundColor: 'rgb(225, 245, 247);',
    },
    avatar: {
        maxWidth: "100%",
        maxHeight: "100%",
        borderRadius: "50%",
    },
    avatar_circle: {
        width: "50px",
        height: "50px",
        marginRight: "10px",
        position: "relative",
    },
    user_name: {
        fontWeight: "bold",
    },
    message: {
        color: "rgb(128, 125, 153)",
        overflowY: "hidden",
        fontSize: "14px",
        maxHeight: "40px"
    },
    listTile: {
        width: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: 'flex-start'
    }

})