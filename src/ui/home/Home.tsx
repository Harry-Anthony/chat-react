import { Drawer } from "./components/drawer.component"
import { ListMessage } from "./components/listMessage.component"
import { Discussion } from "./components/discussion.component"
import styles from "./Home.module.css"

export function Home() {
    return (
        <div className={styles.home_container}>
            {/* <Drawer /> */}
            <ListMessage />
            <Discussion />
        </div>
    )
}