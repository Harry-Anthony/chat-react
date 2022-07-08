import styles from "../Home.module.css";
import boy from '../../../assets/boy.png'


export function MessageCard(props: any) {
    return (
        props.isMe ? <div className={styles.message_detail}>
            <div className={styles.message_card}>
                {props.message}
            </div>
        </div> : <div className={styles.message_friend_detail}>
            <div className={styles.min_avatar}>
                <img src={props.avatar ?? boy} className={styles.avatar} />
            </div>
            <div className={styles.message_card_friend}>
                {props.message}
            </div>
        </div>

    );
}