import styles from '../Home.module.css'
import { ListTileMessage } from './listTileMessage.component'
import searchIcon from '../../../assets/search.png'
import { io } from "socket.io-client";
import { useEffect, useState } from 'react';
import { User } from "../../../models/i_user";



export function ListMessage() {
    const socket = io("http://localhost:3000");
    let ignore = false;
    let data = localStorage.getItem("user");
    let user: User | null = JSON.parse(data!);
    const [discussions, setDiscussion] = useState([]);
    useEffect(() => {
        console.log("user", user)
        if (!ignore) {
            socket.emit("discussion:read", {
                userId: `${user?._id}`
            });
        }
        socket.on(`discussion:${user?._id}`, (discussion) => {
            console.log("discussion", discussion);
            setDiscussion(discussion.discussion);
        });
        return () => {
            socket.removeListener(`discussion:${user?._id}`);
            ignore = true;
        };
    }, []);
    return (
        <div className={styles.list_message}>
            <div className={styles.container_input_search}>
                <input type="text" placeholder='Chat' className={styles.input_search} alt="test tset" />
                <img src={searchIcon} className={styles.icon} />
            </div>
            {
                discussions.map((e) => {
                    return <ListTileMessage message={e}/>;
                })
            }
        </div>
    )
}