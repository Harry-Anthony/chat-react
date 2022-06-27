import styles from '../Home.module.css';
import boy from '../../../assets/boy.png'
import { useAppDispatch } from '../../../store/hooks';
import { selectFriendForDiscussion } from '../../../slice/discussionSlice/discussionSlice';


export interface ListTileMessageProps {
    message: any;
}

export function ListTileMessage(props: ListTileMessageProps) {
    console.log("props", props.message);
    const dispatch = useAppDispatch();
    return (
        <div className={styles.list_tile_message} onClick={()=>{
            dispatch(selectFriendForDiscussion(props.message.friend))
        }}>
            <div className={styles.avatar_circle}>
                <div className={styles.status_circle}></div>
                <img src={props.message.friend.avatar ?? boy} className={styles.avatar} />
            </div>
            <div className={styles.message}>
                <span
                className={styles.user_name}>{props.message.friend.name}</span>
                <span className={styles.message_content}>{props.message.message.content}</span>
            </div>
            <div className={styles.message_date}>1 min</div>
        </div>
    )
}