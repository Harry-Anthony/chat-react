import { useAppDispatch } from "../../../store/hooks";
import { login, setInputType, InputType, register } from "../../../slice/authSlice/authSlice";
import { useState } from "react";
import styles from "../Auth.module.css";

export function RegisterComponent() {
    let [name, setName] = useState("");
    let [mail, setMail] = useState("");
    let [password, setPassword] = useState("");
    let dispatch = useAppDispatch();
    return (
        <div className={styles.main_form}>
            <span className={styles.welcome_text}>WELCOME</span>
            <form onSubmit={(e) => {
                e.preventDefault();
                dispatch(register({ mail, password, name }));
            }}>
                <label>
                    <i className="fa fa-user icon"></i>
                    <input type="mail" name="name" placeholder="mail" autoFocus onChange={(e) => setMail(e.target.value)} />
                </label>
                <label>
                    <i className="fa fa-user icon"></i>
                    <input type="text" name="name" placeholder="your name" autoFocus onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    <input type="password" name="password" placeholder="password" autoFocus onChange={(e) => setPassword(e.target.value)} />
                </label>
                <label>
                    <input type="password" name="password" placeholder="confirm password" autoFocus onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button>Register</button>
            </form>
            <span className={styles.signUp_text}>
                Already have an account?
                <a
                    className={styles.link_sign_up}
                    href="#"
                    onClick={() => {
                        dispatch(setInputType(InputType.login))
                    }}
                >
                    Sign in
                </a>
            </span>
        </div>
    )
}