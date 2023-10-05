import { Backdrop, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";

export const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let data = localStorage.getItem("user");
    if (data) {
      navigate("/home");
    } else {
      navigate("/auth");
    }
  }, [navigate]);
  return (
    <div className={styles.splash_container}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
