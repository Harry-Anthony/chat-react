import { User } from "../../../models/i_user"
import styles from '../Home.module.css';
import boy from '../../../assets/boy.png'
import { selectFriend, selectFriendForDiscussion } from "../../../slice/discussionSlice/discussionSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

interface searchResultProps {
    user: User;
}

export function SearchResult(props: searchResultProps) {
    const dispatch = useAppDispatch();
    const friend = useAppSelector(selectFriend);

    return (
        <div className={styles.list_tile_message} onClick={() => {
            if(!friend || friend._id != props.user._id) {
                dispatch(selectFriendForDiscussion(props.user))
            }
        }}>
            <div className={styles.avatar_circle}>
                <div className={styles.status_circle}></div>
                <img src={props.user.avatar ?? boy} className={styles.avatar} />
            </div>
            <span
                className={styles.user_name}>{props.user.name}</span>
        </div>
    );
}