import { Avatar } from "@mui/material"
import { StyleSheet,css } from "aphrodite"


export function UserInfoCard(props: any) {
    return (
        <div className={css(styles.container)}>
            <Avatar sx={{
                width: "60px",
                height: "60px"
            }}/>
            <div className={css(styles.containerInfo)}>
                <span>{props.user.name}</span>
                <span>{props.user.mail}</span>
            </div>
        </div>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100px"
    },
    containerInfo: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginLeft: "10px"
    }
})