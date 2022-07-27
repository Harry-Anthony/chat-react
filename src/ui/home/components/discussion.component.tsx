import styles from "../Home.module.css"
import edition from '../../../assets/edition.png'
import { MessageCard } from "./messageCard.component"
import sendIcon from '../../../assets/send.png';
import emoji from '../../../assets/emoji.png';
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getListMessage, selectFriend, selectListMessage, sendMessage } from "../../../slice/discussionSlice/discussionSlice";
import { useEffect, useState } from "react";
import boy from '../../../assets/boy.png'
import { io } from "socket.io-client";
import { User } from "../../../models/i_user";
import Lottie from 'react-lottie';
import animationChat from '../../../assets/chat.json';
import TextField from '@mui/material/TextField';
export interface DiscussionProps {
    me: User
}
export function Discussion(props: any) {
    const allMessage = useAppSelector(selectListMessage);
    const dispatch = useAppDispatch();
    const [message, setMessage] = useState("");
    const friend = useAppSelector(selectFriend);
    let data = localStorage.getItem("user");
    let user: User | null = JSON.parse(data!);
    const socket = io("http://localhost:3000");
    let ignore = false
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationChat,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    useEffect(() => {
        if (friend) {
            socket.emit("message:read", {
                userId: user?._id,
                friendId: friend._id,
            });
            socket.on(`message:${user?._id}:${friend._id}`, (message) => {
                if (message != null) {
                    dispatch(getListMessage(message.allMessage));
                } else {
                    dispatch(getListMessage([]));
                }
            });
            socket.on(`message:create:${user?._id}:${friend._id}`, (message) => {
                dispatch(sendMessage(message))
            });
        }
        return () => {
            ignore = true;
            if (friend) {
                socket.removeListener(`message:${user?._id}:${friend._id}`);
                socket.removeListener(`message:create:${user?._id}:${friend._id}`);
            }
        }
    }, [friend]);
    if (!friend) {
        return (
            <div className={styles.animationChat}>
                <Lottie
                    options={defaultOptions}
                />
            </div>
        )
    }
    return (
        <div className={styles.message_container}>
            <div className={styles.header_message}>
                <div className={styles.user_profil}>
                    <div className={styles.avatar_circle}>
                        <div className={styles.status_circle}></div>
                        <img src={user?.avatar ?? boy} className={styles.avatar} />
                    </div>
                    <div>{user?.name}</div>
                </div>
                <img src={edition} className={styles.icon} />
            </div>
            <div className={styles.all_message}>
                {
                    allMessage.length != 0 ?
                        allMessage.map((e) => {
                            return <MessageCard
                                isMe={e.userSender._id != friend?._id}
                                message={e.content}
                                avatar={e.userSender.avatar}
                            />
                        }) :
                        (<div className={styles.no_message_text}>
                            Aucune discussion
                        </div>)
                }
            </div>
            <div className={styles.container_input_message}>
                <img src={emoji} className={styles.icon} />
                <textarea
                    placeholder='Message'
                    className={styles.input_message}
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                >
                </textarea>
                {/* <TextField sx={{
                    width: '100%',
                }} id="standard-basic" label="Message" variant="standard" /> */}
                <button className={styles.button_send} onClick={
                    (e) => {
                        if (message.length != 0 && friend) {
                            socket.emit("message:create", {
                                body: {
                                    "userSender": user?._id,
                                    "userReceiver": friend._id,
                                    "type": "text",
                                    "content": message,
                                },
                                "isFirstDiscussion": allMessage.length != 0 ? false : true
                            });
                            setMessage("");
                        }
                    }}
                >
                    <img src={sendIcon} className={styles.icon} />
                </button>
            </div>
        </div>
    )
}