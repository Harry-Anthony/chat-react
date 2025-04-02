import styles from "../Home.module.css";
import boy from "../../../assets/boy.png";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  getListMessage,
  selectFriend,
  selectFriendForDiscussion,
} from "../../../slice/discussionSlice/discussionSlice";

export interface ListTileMessageProps {
  message: any;
  onClickItem?: () => void;
}

export function ListTileMessage(props: ListTileMessageProps) {
  const dispatch = useAppDispatch();
  const friend = useAppSelector(selectFriend);
  const {onClickItem} = props;

  return (
    <div
      className={styles.list_tile_message}
      onClick={() => {
        onClickItem?.();
        if (friend?._id !== props.message.friend._id) {
          dispatch(getListMessage([]));
          dispatch(selectFriendForDiscussion(props.message.friend));
        }
      }}
    >
      <div className={styles.avatar_circle}>
        <div className={styles.status_circle}></div>
        <img
          src={props.message.friend.avatar ?? boy}
          className={styles.avatar}
          alt=""
        />
      </div>
      <div className={styles.message}>
        <span className={styles.user_name}>{props.message.friend.name}</span>
        <span className={styles.message_content}>
          {props.message.message.content}
        </span>
      </div>
      <div className={styles.message_date}></div>
    </div>
  );
}
