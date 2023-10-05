import styles from "../Home.module.css";
import edition from "../../../assets/edition.png";
import { MessageCard } from "./messageCard.component";
import sendIcon from "../../../assets/send.png";
import emoji from "../../../assets/emoji.png";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  getListMessage,
  selectFriend,
  selectListMessage,
  sendMessage,
} from "../../../slice/discussionSlice/discussionSlice";
import { useCallback, useEffect, useRef, useState } from "react";
import boy from "../../../assets/boy.png";
import { User } from "../../../models/i_user";
import Lottie from "react-lottie";
import animationChat from "../../../assets/chat.json";
import { useNavigate } from "react-router-dom";
import { socket } from "../../../utils/socket";
import { useLazyGetLastMessageQuery } from "../../../repository/Api/chatApi/chatApi";
import { Message } from "../../../models/i_message";

export interface DiscussionProps {
  me: User;
}
export function Discussion(props: any) {
  const navigate = useNavigate();
  const allMessage = useAppSelector(selectListMessage);
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("");
  const friend = useAppSelector(selectFriend);
  const [user, setUser] = useState<User | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationChat,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [fetch, { isLoading }] = useLazyGetLastMessageQuery();
  const disableScroll = useRef<boolean>(false);

  const handleGetLast = useCallback(async () => {
    if (allMessage[0] && friend && user && !isLoading) {
      const { data } = await fetch({
        firstId: user._id,
        secondId: friend._id,
        lastIndex: allMessage[0]._id,
      });
      if (data && data.allMessage) {
        disableScroll.current = true;
        const newList = [...data.allMessage, ...allMessage] as Message[];
        dispatch(getListMessage(newList));
      }
    }
  }, [fetch, allMessage, friend, user, getListMessage, dispatch, isLoading]);

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
      if (event.currentTarget.scrollTop === 0) handleGetLast();
    },
    [handleGetLast]
  );

  useEffect(() => {
    if (!disableScroll.current) {
      listRef.current?.lastElementChild?.scrollIntoView();
    }
    disableScroll.current = false;
  }, [allMessage]);

  useEffect(() => {
    let data = localStorage.getItem("user");
    if (!data) {
      navigate("/auth");
    } else {
      setUser(JSON.parse(data!));
    }
  }, []);
  useEffect(() => {
    let ignore = false;
    if (friend && user) {
      socket.emit("message:read", {
        userId: user?._id,
        friendId: friend._id,
      });
      socket.on(`message:${user?._id}:${friend._id}`, (message) => {
        if (message && message.allMessage) {
          dispatch(getListMessage(message.allMessage));
        } else {
          dispatch(getListMessage([]));
        }
      });
      socket.on(`message:create:${user?._id}:${friend._id}`, (message) => {
        dispatch(sendMessage(message));
      });
    }
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars
      ignore = true;
      if (friend) {
        socket.removeListener(`message:${user?._id}:${friend._id}`);
        socket.removeListener(`message:create:${user?._id}:${friend._id}`);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friend, user]);
  if (!friend) {
    return (
      <div className={styles.animationChat}>
        <Lottie options={defaultOptions} />
      </div>
    );
  }
  return (
    <div className={styles.message_container}>
      <div className={styles.header_message}>
        <div className={styles.user_profil}>
          <div className={styles.avatar_circle}>
            <div className={styles.status_circle}></div>
            <img src={user?.avatar ?? boy} className={styles.avatar} alt="" />
          </div>
          <div>{user?.name}</div>
        </div>
        <img
          src={edition}
          className={styles.icon}
          alt=""
          onClick={() => {
            localStorage.setItem("user", "");
            navigate("/auth");
          }}
        />
      </div>
      <div ref={listRef} onScroll={handleScroll} className={styles.all_message}>
        {allMessage.length !== 0 ? (
          allMessage.map((e, index) => {
            return (
              <MessageCard
                key={`card-${index}`}
                isMe={e.userSender._id !== friend?._id}
                message={e.content}
                avatar={e.userSender.avatar}
              />
            );
          })
        ) : (
          <div className={styles.no_message_text}>Aucune discussion</div>
        )}
      </div>
      <div className={styles.container_input_message}>
        <img src={emoji} className={styles.icon} alt="" />
        <textarea
          placeholder="Message"
          className={styles.input_message}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button
          className={styles.button_send}
          onClick={(e) => {
            if (message.length !== 0 && friend) {
              socket.emit("message:create", {
                body: {
                  userSender: user?._id,
                  userReceiver: friend._id,
                  type: "text",
                  content: message,
                },
                isFirstDiscussion: allMessage.length !== 0 ? false : true,
              });
              setMessage("");
            }
          }}
        >
          <img src={sendIcon} className={styles.icon} alt="" />
        </button>
      </div>
    </div>
  );
}
