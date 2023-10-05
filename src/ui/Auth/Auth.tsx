import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  InputType,
  loginStatus,
  resetState,
  selectErrorMessage,
  selectInputType,
} from "../../slice/authSlice/authSlice";
import { LoginStatus } from "../../slice/authSlice/login_enum";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import styles from "./Auth.module.css";
import Lottie from "react-lottie";
import animationChat from "../../assets/girl-chatting.json";
import { LoginComponent } from "./components/login.component";
import { RegisterComponent } from "./components/register.component";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

export function Auth() {
  let status = useAppSelector(loginStatus);
  let inputType = useAppSelector(selectInputType);
  let errorMessage = useAppSelector(selectErrorMessage);
  let dispatch = useAppDispatch();
  let navigate = useNavigate();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationChat,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {
    if (status === LoginStatus.success) {
      dispatch(resetState());
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div className={styles.container_form}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={status === LoginStatus.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={styles.form}>
        <div className={styles.illust_login}>
          <Lottie options={defaultOptions} />
        </div>
        {inputType === InputType.login ? (
          <LoginComponent />
        ) : (
          <RegisterComponent />
        )}
      </div>
      <Snackbar
        open={status === LoginStatus.error}
        autoHideDuration={6000}
        onClose={() => {}}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {" "}
          {inputType === InputType.login
            ? "mot de pass ou mail invalide"
            : errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
