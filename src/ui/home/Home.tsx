import { ListMessage } from "./components/listMessage.component";
import { Discussion } from "./components/discussion.component";
import styles from "./Home.module.css";
import { Drawer } from "@mui/material";
import { useEffect, useState } from "react";
import inbox from "../../assets/Message.svg";

export function Home() {
  const [open, setOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 630) {
        setIsMobile(true);
        setOpen(false);
      } else {
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className={styles.home_container}>
      {isMobile ? (
        <Drawer
          variant="persistent"
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <ListMessage
            onClose={() => {
              setOpen(false);
            }}
            onClickItem={() => setOpen(false)}
          />
        </Drawer>
      ) : (
        <ListMessage />
      )}
      <Discussion />
      {isMobile && (
        <div className={styles.drawer} onClick={() => setOpen(true)}>
          <img src={inbox} width="32" className="img" alt="inbox" />
        </div>
      )}
    </div>
  );
}
