import { selectChatDataState, selectFriend, selectFriendForDiscussion } from "../../../slice/discussionSlice/discussionSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import boy from '../../../assets/boy.png'
import { css, StyleSheet } from 'aphrodite';
import { useContext } from "react";
import { SocketContext } from "../../service/socket";
import { UserContext } from "../../service/user";
import { Avatar } from "@mui/material";



export function ListTileMessage(props: any) {
    const dispatch = useAppDispatch();
    const socket = useContext(SocketContext)
    const friend = useAppSelector(selectFriend);
    const user = useContext(UserContext);

    return (
        <div className={css(styles.container)} onClick={() => {
            if (friend && friend._id != props.friend._id) {
                socket.removeListener(`message:create:${user._id}:${friend._id}`);
                dispatch(selectFriendForDiscussion(props.friend))
            } else if (!friend) {
                dispatch(selectFriendForDiscussion(props.friend))
            }
        }}>
            <div className={css(styles.avatar_circle)}>
                {/* <img src={props.friend.avatar ?? boy} className={css(styles.avatar)} /> */}
                <Avatar />
            </div>
            <div className={css(styles.listTile)}>
                <span
                    className={css(styles.user_name)}
                >
                    {props.friend.name}
                </span>
                <div className={css(styles.message)}>{props.message.content}</div>
            </div>
        </div>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "50px",
        margin: "40px 10px",
        maxHeight: "50px",
        maxWidth: "max-content",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        cursor: "pointer"
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