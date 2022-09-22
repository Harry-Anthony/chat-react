import { useContext, useEffect, useMemo, useState } from "react"
import { SocketContext } from "../../service/socket"
import { UserContext } from "../../service/user";
import animationChat from '../../../assets/chat.json';
import Lottie from "react-lottie";
import { css, StyleSheet } from "aphrodite";
import { addMessage, getLastMessage, selectChatDataState, selectChatList, selectFriend, setChatList } from "../../../slice/discussionSlice/discussionSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { MessageCard } from "../../../ui/home/components/messageCard.component";
import sendIcon from '../../../assets/send.png';
import emoji from '../../../assets/emoji.png';
import { AppState } from "../../tools/enum/app_enum";


export function Chat() {
    const socket = useContext(SocketContext);
    const user = useContext(UserContext);
    const allMessage = useAppSelector(selectChatList);
    const friend = useAppSelector(selectFriend);
    const dispatch = useAppDispatch();
    const [message, setMessage] = useState("");
    const chatDataState = useAppSelector(selectChatDataState);

    const defaultOptions = useMemo(() => {
        return {
            loop: true,
            autoplay: true,
            animationData: animationChat,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        }
    }, []);

    useEffect(() => {
        if (friend) {
            console.log("friend", friend.allMessage)
            if (!friend.allMessage) {
                dispatch(getLastMessage({ firstId: user._id, secondId: friend._id, lastIndex: allMessage[allMessage.length - 1] }))
            } else {
                dispatch(setChatList(friend.allMessage));
                socket.on(`message:create:${user._id}:${friend._id}`, (data: any)=>{
                    console.log("new message to push", data);
                    dispatch(addMessage(data));
                });
            }
        }
    }, [friend]);

    useEffect(() => {
        if(chatDataState === AppState.success) {
            socket.on(`message:create:${user._id}:${friend._id}`, (data: any)=>{
                console.log("new message to push", data);
                dispatch(addMessage(data));
            });
        }
    }, [chatDataState]);


    if (friend) {
        return (
            <div className={css(styles.container)}>
                <div className={css(styles.all_message)}>
                    {
                        allMessage.length != 0 ?
                            allMessage.map((e) => {
                                return <MessageCard
                                    key={e._id}
                                    isMe={e.userSender._id != friend?._id}
                                    message={e.content}
                                    avatar={e.userSender.avatar}
                                />
                            }) :
                            (<div>
                                Aucune discussion
                            </div>)
                    }
                </div>
                <div className={css(styles.container_input_message)}>
                    <img src={emoji} className={css(styles.icon)} />
                    <textarea
                        placeholder='Message'
                        className={css(styles.input_message)}
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                    >
                    </textarea>
                    <button className={css(styles.button_send)} onClick={
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
                        <img src={sendIcon} className={css(styles.icon)} />
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className={css(styles.container)}>
            <Lottie
                options={defaultOptions}
            />
        </div>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100vh",
        paddingRight: "100px",
        display: "flex",
        flexDirection: "column",
        paddingBottom: "50px"
    },
    container_input_message: {
        display: "flex",
        alignItems: "center",
        // position: "relative",
        border: "solid 1px rgb(221, 218, 218)",
        padding: "8px",
        borderRadius: "10px",
    },
    input_message: {
        borderColor: "transparent",
        padding: "20px",
        width: "100%",
        outline: "none",
        borderLeft: "1px solid rgb(221, 218, 218)",
        borderRight: "1px solid rgb(221, 218, 218)",
        margin: "0x 5px",
    },
    button_send: {
        backgroundColor: "transparent",
        border: "none",
    },
    icon: {
        width: "20px",
        height: "20px",
        margin: "0px 8px",
    },
    all_message: {
        overflowY: "auto",
        flex: "100%",
    }
})