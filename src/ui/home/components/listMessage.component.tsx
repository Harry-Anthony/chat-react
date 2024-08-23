import styles from "../Home.module.css";
import { ListTileMessage } from "./listTileMessage.component";
import closeIcon from "../../../assets/close.png";
import searchIcon from "../../../assets/search.png";
import { useEffect, useState } from "react";
import { User } from "../../../models/i_user";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  searchUser,
  selectListUser,
  updateListUser,
} from "../../../slice/userSlice/userSlice";
import { SearchResult } from "./searchResult.component";
import boy from "../../../assets/boy.png";
import { useNavigate } from "react-router-dom";
import { socket } from "../../../utils/socket";
import disconnect from "../../../assets/disconnect.png";


export function ListMessage() {
  const navigate = useNavigate();
  let ignore = false;
  const [user, setUser] = useState<User | null>(null);
  const [discussions, setDiscussion] = useState([]);
  const dispatch = useAppDispatch();
  const listUser = useAppSelector(selectListUser);
  const [isDiscussion, setIsDiscussion] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    let data = localStorage.getItem("user");
    if (!data) {
      navigate("/auth");
    } else {
      setUser(JSON.parse(data!));
    }
  }, [navigate]);
  useEffect(() => {
    if (user) {
      if (!ignore) {
        socket.emit("discussion:read", {
          userId: `${user?._id}`,
        });
      }
      socket.on(`discussion:${user?._id}`, (discussion) => {
        if (discussion && discussion.discussion) {
          setDiscussion(discussion.discussion);
        } else {
          setDiscussion([]);
        }
      });
      return () => {
        socket.removeListener(`discussion:${user?._id}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ignore = true;
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <div className={styles.list_message}>
      <div className={styles.user_info}>
        <div className={styles.user_profil}>
          <div className={styles.avatar_circle}>
            <div className={styles.status_circle}></div>
            <img src={user?.avatar ?? boy} className={styles.avatar} alt="" />
          </div>
        </div>
        <span>{user?.name}</span>
        <span>{user?.mail}</span>
        <img
          src={disconnect}
          className={styles.disconnect}
          alt=""
          onClick={() => {
            localStorage.setItem("user", "");
            navigate("/auth");
          }}
        />
      </div>
      <div className={styles.container_input_search}>
        <input
          type="text"
          placeholder="Chat"
          value={searchInput}
          className={styles.input_search}
          onChange={(e) => {
            setSearchInput(e.target.value);
            if (e.target.value) {
              dispatch(searchUser(e.target.value));
            } else {
              //TODO: set list to list void
              dispatch(updateListUser());
            }
          }}
          onFocus={(e) => {
            setIsDiscussion(false);
          }}
        />
        {!isDiscussion ? (
          <img
            src={closeIcon}
            className={styles.icon}
            alt=""
            onClick={() => {
              setSearchInput("");
              dispatch(updateListUser());
              setIsDiscussion(true);
            }}
          />
        ) : (
          <img
            src={searchIcon}
            className={styles.icon}
            alt=""
            onClick={() => {
              setSearchInput("");
              dispatch(updateListUser());
              setIsDiscussion(true);
            }}
          />
        )}
      </div>
      {isDiscussion && discussions ? (
        discussions
          .slice(0)
          .reverse()
          .map((e, index) => {
            return <ListTileMessage key={`tile-${index}`} message={e} />;
            // eslint-disable-next-line array-callback-return
          })
      ) : listUser ? (
        listUser.map((e, index) => {
          if (e._id !== user?._id) {
            return <SearchResult key={`srch-${index}`} user={e} />;
          }
          return null;
        })
      ) : (
        <div>await</div>
      )}
    </div>
  );
}
