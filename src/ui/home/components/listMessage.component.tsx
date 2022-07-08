import styles from '../Home.module.css'
import { ListTileMessage } from './listTileMessage.component'
import closeIcon from '../../../assets/close.png';
import { io } from "socket.io-client";
import { useEffect, useState } from 'react';
import { User } from "../../../models/i_user";
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { searchUser, selectListUser, updateListUser } from '../../../slice/userSlice/userSlice';
import { SearchResult } from './searchResult.component';


export function ListMessage() {
    const socket = io("http://localhost:3000");
    let ignore = false;
    let data = localStorage.getItem("user");
    let user: User | null = JSON.parse(data!);
    const [discussions, setDiscussion] = useState([]);
    const dispatch = useAppDispatch();
    const listUser = useAppSelector(selectListUser);
    const [isDiscussion, setIsDiscussion] = useState(true);
    const [searchInput, setSearchInput] = useState("");
    useEffect(() => {
        if (!ignore) {
            socket.emit("discussion:read", {
                userId: `${user?._id}`
            });
        }
        socket.on(`discussion:${user?._id}`, (discussion) => {
            console.log("discussion", discussion);
            if (discussion != null) {
                setDiscussion(discussion.discussion);
            } else {
                setDiscussion([])
            }
        });
        return () => {
            socket.removeListener(`discussion:${user?._id}`);
            ignore = true;
        };
    }, []);
    return (
        <div className={styles.list_message}>
            <div className={styles.container_input_search}>
                <input
                    type="text"
                    placeholder='Chat'
                    value={searchInput}
                    className={styles.input_search}
                    onChange={(e) => {
                        setSearchInput(e.target.value);
                        if(e.target.value) {
                            dispatch(searchUser(e.target.value));
                        } else {
                            //TODO: set list to list void
                            dispatch(updateListUser());
                        }
                    }}
                    onFocus={
                        (e) => {
                            setIsDiscussion(false)
                        }
                    }
                />
                {
                    !isDiscussion ? <img
                        src={closeIcon}
                        className={styles.icon}
                        onClick={() => {
                            setSearchInput("");
                            dispatch(updateListUser());
                            setIsDiscussion(true)
                        }}
                    /> : <div></div>
                }
            </div>
            {

                isDiscussion ? discussions.slice(0).reverse().map((e) => {
                    return <ListTileMessage message={e} />;
                }) : (listUser ? listUser.map((e) => {
                    if (e._id != user?._id) {
                        return (
                            <SearchResult user={e} />
                        );
                    }
                }) : <div>await</div>)
            }
        </div>
    )
}