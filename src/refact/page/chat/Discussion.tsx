import { css, StyleSheet } from "aphrodite";
import { useContext, useEffect, useState } from "react";
import { getAllDiscussion, handleDiscussion, resetDiscussionSlice, selectDiscussionState, selectListMessage } from "../../../slice/discussionSlice/discussionSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { SocketContext } from "../../service/socket";
import { UserContext } from "../../service/user";
import { AppState } from "../../tools/enum/app_enum";
import { ListTileMessage } from "./ListTileMessage";
import closeIcon from '../../../assets/close.png';
import { resetUserSlice, searchUser, searchUserStatus, selectListUser, updateListUser } from "../../../slice/userSlice/userSlice";
import { SearchResult } from "../../../ui/home/components/searchResult.component";
import { UserInfoCard } from "./UserInfoCard";
import { useNavigate } from "react-router-dom";
import { resetAuth } from "../../../slice/authSlice/authSlice";


export function Discussion() {
    const socket = useContext(SocketContext);
    const user = useContext(UserContext);
    const discussions = useAppSelector(selectListMessage);
    const discussionState = useAppSelector(selectDiscussionState);
    const status = useAppSelector(searchUserStatus);
    const listUser = useAppSelector(selectListUser);
    const dispatch = useAppDispatch();
    const [searchInput, setSearchInput] = useState("");
    const [isDiscussion, setIsDiscussion] = useState(true);
    const navigate = useNavigate()

    let ignore = false;
    useEffect(() => {
        if (!ignore) {
            dispatch(getAllDiscussion(user._id))
        }
        return () => {
            ignore = true;
        }
    }, []);

    useEffect(() => {
        if (discussionState == AppState.success) {
            socket.on(`discussion:${user._id}`, (message: any) => {
                dispatch(handleDiscussion(message));
            })
        }
        return () => {
            socket.removeListener(`discussion:${user._id}`);
        }
    }, [discussionState])

    if (!isDiscussion) {
        return (
            <div className={css(styles.container)}>
                <UserInfoCard user={user} />
                <div className={css(styles.container_input_search)}>
                    <input
                        type="text"
                        placeholder='Chat'
                        value={searchInput}
                        className={css(styles.input_search)}
                        onChange={(e) => {
                            setSearchInput(e.target.value);
                            if (e.target.value) {
                                dispatch(searchUser(e.target.value));
                            } else {
                                dispatch(updateListUser());
                            }
                        }}
                        onFocus={
                            (e) => {
                                setIsDiscussion(false)
                            }
                        }
                    />
                    <img
                        src={closeIcon}
                        className={css(styles.icon)}
                        onClick={() => {
                            setSearchInput("");
                            dispatch(updateListUser());
                            setIsDiscussion(true)
                        }}
                    />
                </div>
                <div className={css(styles.discussion)}>
                    {
                        status === AppState.loading ? <div>loading</div> :
                            (listUser?.length != 0 ? listUser?.map((e: any) => {
                                return <SearchResult key={e._id} friend={e} />
                            }) : <div>no search result</div>)
                    }
                </div>
            </div>
        )
    }


    return (
        <div className={css(styles.container)}>
            <UserInfoCard user={user} />
            <div className={css(styles.container_input_search)}>
                <input
                    type="text"
                    placeholder='Chat'
                    value={searchInput}
                    className={css(styles.input_search)}
                    onFocus={
                        (e) => {
                            setIsDiscussion(false)
                        }
                    }
                />
            </div>
            <div className={css(styles.discussion)}>
                {
                    discussionState === AppState.loading ?
                        <div>Loading</div> :
                        discussions.slice(0).reverse().map((e: any) => {
                            return (
                                <ListTileMessage
                                    key={e._id}
                                    friend={e.friend}
                                    message={e.message}
                                />
                            )
                        })
                }
            </div>
            <div className={css(styles.logout)} onClick={() => {
                dispatch(resetAuth())
                dispatch(resetUserSlice())
                dispatch(resetDiscussionSlice())
                socket.removeAllListeners()
                navigate('/', { replace: true })
            }}>
                <img src="" alt="" />
                <button>Logout</button>
            </div>
        </div>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        width: "300px",
        height: "100vh",
        borderRight: "1px solid black",
    },
    icon: {
        width: "20px",
        height: "20px",
        margin: "0px 8px",
        cursor: "pointer"
    },
    container_input_search: {
        display: "flex",
        alignItems: "center",
        margin: "30px 10px",
    },
    input_search: {
        borderColor: "transparent",
        borderBottom: "1px solid #b4b3b8",
        backgroundColor: "#fafafa",
        padding: "20px",
        width: "100%",
        outline: "none",
    },
    discussion: {
        overflowY: "scroll",
        flex: "100%"
    },
    logout: {
        padding: '10px 10px',
        cursor: 'pointer'
    }
})