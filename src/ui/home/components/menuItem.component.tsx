import styles from '../Home.module.css';

export function MenuItem(props: any) {
    return (
        <div className={styles.menu_item}>
            <img src={props.icon} className={styles.icon} />
            <span>{props.value}</span>
        </div>
    )
}