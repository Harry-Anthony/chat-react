/* eslint-disable jsx-a11y/anchor-is-valid */
import { useAppDispatch } from "../../../store/hooks";
import {
  InputType,
  login,
  setInputType,
} from "../../../slice/authSlice/authSlice";
import { useState } from "react";
import styles from "../Auth.module.css";

export function LoginComponent() {
  let [mail, setMail] = useState("test@test.mail");
  let [password, setPassword] = useState("1234");
  let dispatch = useAppDispatch();
  return (
    <div className={styles.main_form}>
      <span className={styles.welcome_text}>WELCOME</span>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(login({ mail, password }));
        }}
      >
        <label>
          <i className="fa fa-user icon"></i>
          <input
            value={mail}
            type="mail"
            name="mail"
            placeholder="mail"
            autoFocus
            onChange={(e) => setMail(e.target.value)}
          />
        </label>
        <label>
          <input
            value={password}
            type="password"
            name="password"
            placeholder="password"
            autoFocus
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button>Login</button>
      </form>
      <span className={styles.signUp_text}>
        Don't have an account?
        <a
          className={styles.link_sign_up}
          href="#"
          onClick={() => {
            dispatch(setInputType(InputType.register));
          }}
        >
          Sign Up
        </a>
      </span>
    </div>
  );
}
