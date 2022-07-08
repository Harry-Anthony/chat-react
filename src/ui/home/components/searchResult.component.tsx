import { User } from "../../../models/i_user"
import styles from '../Home.module.css';
import boy from '../../../assets/boy.png'
import { selectFriendForDiscussion } from "../../../slice/discussionSlice/discussionSlice";
import { useAppDispatch } from "../../../store/hooks";

interface searchResultProps {
    user: User;
}

export function SearchResult(props: searchResultProps) {
    const dispatch = useAppDispatch();

    return (
        <div className={styles.list_tile_message} onClick={() => {
            dispatch(selectFriendForDiscussion(props.user))
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