import Alert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import { useMemo } from "react";
import Lottie from "react-lottie";
import { Outlet } from "react-router-dom";
import { selectAuthStatus, selectErrorMessage, setStatus } from "../../../slice/authSlice/authSlice";
import { AuthStatus } from "../../../slice/authSlice/login_enum";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import styles from "./auth.module.css";
import animationChat from '../../../assets/girl-chatting.json';


export function Auth() {
    let status = useAppSelector(selectAuthStatus);
    let errorMessage = useAppSelector(selectErrorMessage);
    let dispatch = useAppDispatch();
    const defaultOptions = useMemo(() => {
        return {
            loop: true,
            autoplay: true,
            animationData: animationChat,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        };
    }, [])

    return (
        <div className={styles.container_form}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={status === AuthStatus.loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className={styles.form} >
                <div className={styles.illust_login}>
                    <Lottie
                        options={defaultOptions}
                    />
                </div>
                <Outlet />
            </div>
            <Snackbar
                open={status === AuthStatus.error}
                autoHideDuration={3000}
                onClose={() => { 
                    dispatch(setStatus(AuthStatus.initial))
                }}
            >
                <Alert severity="error" sx={{ width: '100%' }}> {errorMessage}</Alert>
            </Snackbar>
        </div>
    )
}