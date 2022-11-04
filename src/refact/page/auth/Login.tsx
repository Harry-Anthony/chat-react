import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, setInputType, InputType, selectAuthStatus, resetAuth } from "../../../slice/authSlice/authSlice";
import { AuthStatus } from "../../../slice/authSlice/login_enum";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import styles from "./auth.module.css"


export function Login() {
    let status = useAppSelector(selectAuthStatus);
    let [mail, setMail] = useState("");
    let [password, setPassword] = useState("");
    let dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {

        if (status == AuthStatus.success) {
            navigate('/chatHome', {replace: true});
        }
    }, [status])
    return (
        <div className={styles.main_form}>
            <span className={styles.welcome_text}>WELCOME</span>
            <form onSubmit={(e) => {
                e.preventDefault();
                dispatch(login({ mail, password }));
            }}>
                <label>
                    <i className="fa fa-user icon"></i>
                    <input type="mail" name="mail" placeholder="mail" autoFocus onChange={(e) => setMail(e.target.value)} />
                </label>
                <label>
                    <input type="password" name="password" placeholder="password" autoFocus onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button>Login</button>
            </form>
            <span className={styles.signUp_text}>
                Don't have an account?
                <a
                    className={styles.link_sign_up}
                    href="#"
                    onClick={() => {
                        navigate('/register')
                    }}
                >
                    Sign Up
                </a>
            </span>
        </div>
    )
}