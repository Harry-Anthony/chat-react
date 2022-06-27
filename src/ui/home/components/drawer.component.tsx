import styles from "../Home.module.css"
import { MenuItem } from "./menuItem.component"
import settingIcon from '../../../assets/setting.png'
import chat from '../../../assets/chat.png'
import dashboard from '../../../assets/dashboard.png'
import edition from '../../../assets/edition.png'




export function Drawer() {
    return (
        <div className={styles.drawer_component}>
            <div className={styles.head_drawer}>
                <span className={styles.chat_title}>ChatBox</span>
            </div>
            <div className={styles.container_button}>
                <MenuItem value="Chat" icon={chat}/>
                <MenuItem value="Dashboard" icon={dashboard} />
                <MenuItem value="Edit Page" icon={edition} />
                <MenuItem value="Settings" icon={settingIcon} />
            </div>
        </div>
    )
}