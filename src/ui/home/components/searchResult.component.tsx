import { User } from "../../../models/i_user";
import styles from "../Home.module.css";
import boy from "../../../assets/boy.png";
import {
  getListMessage,
  selectFriend,
  selectFriendForDiscussion,
} from "../../../slice/discussionSlice/discussionSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

interface searchResultProps {
  user: User;
  onClickItem?: () => void;
}

export function SearchResult(props: searchResultProps) {
  const dispatch = useAppDispatch();
  const friend = useAppSelector(selectFriend);
  const { onClickItem } = props;

  return (
    <div
      className={styles.list_tile_message}
      onClick={() => {
        onClickItem?.();
        dispatch(selectFriendForDiscussion(props.user));
        if (friend?._id !== props.user._id) {
          dispatch(getListMessage([]));
        }
      }}
    >
      <div className={styles.avatar_circle}>
        <div className={styles.status_circle}></div>
        <img
          alt="avatar"
          src={props.user.avatar ?? boy}
          className={styles.avatar}
        />
      </div>
      <span className={styles.user_name}>{props.user.name}</span>
    </div>
  );
}
