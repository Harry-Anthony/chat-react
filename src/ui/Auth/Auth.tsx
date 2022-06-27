
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, loginStatus } from "../../slice/authSlice/authSlice";
import { LoginStatus } from "../../slice/authSlice/login_enum";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import styles from "./Auth.module.css";
export function Auth() {
    let status = useAppSelector(loginStatus);
    let navigate = useNavigate();
    let dispatch = useAppDispatch();
    let [name, setName] = useState("");
    let [password, setPassword] = useState("");

    useEffect(()=>{
        if(status == LoginStatus.error) {
            alert("mot de pass ou nom invalide");
        } else if(status == LoginStatus.success){
            navigate('/home');
        } else if(status == LoginStatus.loading){
            alert("Loading...");
        }
    }, [status])

    return (
     <div className={styles.container_form}>
         <form className={styles.form} onSubmit={(e)=>{
            e.preventDefault();
            dispatch(login({name, password}));
         }}>
            <label>
                <input type="text" name="name" placeholder="username" autoFocus onChange={(e) => setName(e.target.value)}/>
            </label>
            <label>
                <input type="password" name="password" placeholder="password" autoFocus onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <button>Login</button>
        </form>
     </div>
    );
}