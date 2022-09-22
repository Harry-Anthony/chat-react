import { css, StyleSheet } from 'aphrodite'
import boy from '../../../assets/boy.png'


export function AvatarCircle(props: any) {
    return (
        <div className={css(styles.avatar_circle)}>
            <img src={props.avatar ?? boy} className={css(styles.avatar)} />
        </div>
    )
}

const styles = StyleSheet.create({
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
})