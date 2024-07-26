/* eslint-disable jsx-a11y/anchor-is-valid */
import { useAppDispatch } from "../../../store/hooks";
import {
  setInputType,
  InputType,
  register,
} from "../../../slice/authSlice/authSlice";
import { useCallback, useState } from "react";
import styles from "../Auth.module.css";
import { validateEmail } from "../../../utils/extension";

export function RegisterComponent() {
  let [name, setName] = useState("");
  let [mail, setMail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPwd, setConfirmPwd] = useState("");
  let validePwd = useCallback(() => {
    const minLength = 8;
    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;
    const digitPattern = /[0-9]/;
    const specialCharPattern = /[!@#$%^&*)(+=._-]/;

    if (password.length < minLength) {
      return {
        message: "Password must be at least 8 characters long.",
        isValide: false,
      };
    }
    if (!uppercasePattern.test(password)) {
      return {
        message: "Password must contain at least one uppercase letter.",
        isValide: false,
      };
    }
    if (!lowercasePattern.test(password)) {
      return {
        message: "Password must contain at least one lowercase letter.",
        isValide: false,
      };
    }
    if (!digitPattern.test(password)) {
      return {
        message: "Password must contain at least one digit.",
        isValide: false,
      };
    }
    if (!specialCharPattern.test(password)) {
      return {
        message: "Password must contain at least one special character.",
        isValide: false,
      };
    }
    if (password !== confirmPwd) {
      return {
        message: "Passwords do not match.",
        isValide: false,
      };
    }
    return { message: "Password is valid.", isValide: true };
  }, [password, confirmPwd]);

  let dispatch = useAppDispatch();
  return (
    <div className={styles.main_form}>
      <span className={styles.welcome_text}>WELCOME</span>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const validMail = validateEmail(mail);
          if (!validMail.isValide) {
            alert(validMail.message);
          } else {
            const { message, isValide } = validePwd();
            if (isValide) {
              dispatch(register({ mail, password, name }));
            } else {
              alert(message);
            }
          }
        }}
      >
        <label>
          <i className="fa fa-user icon"></i>
          <input
            type="mail"
            name="name"
            placeholder="mail"
            autoFocus
            onChange={(e) => setMail(e.target.value)}
          />
        </label>
        <label>
          <i className="fa fa-user icon"></i>
          <input
            type="text"
            name="name"
            placeholder="your name"
            autoFocus
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <input
            type="password"
            name="password"
            placeholder="password"
            autoFocus
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <input
            type="password"
            name="confirmPwd"
            placeholder="confirm password"
            autoFocus
            onChange={(e) => setConfirmPwd(e.target.value)}
          />
        </label>
        <button>Register</button>
      </form>
      <span className={styles.signUp_text}>
        Already have an account?
        <a
          className={styles.link_sign_up}
          href="#"
          onClick={() => {
            dispatch(setInputType(InputType.login));
          }}
        >
          Sign in
        </a>
      </span>
    </div>
  );
}
