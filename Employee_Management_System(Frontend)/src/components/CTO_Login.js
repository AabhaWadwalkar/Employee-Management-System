import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {login} from '../store/store';
import styles from '../css/Login.module.css';

const CTO_Login =()=>{
    const usernameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();

        const enteredusername = usernameRef.current.value;
        const enteredpassword = passwordRef.current.value;

        try {
            const res = await fetch("http://localhost:8000/CTO_Login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: enteredusername,
                    password: enteredpassword,
                }),
            });

            if (res.status === 200) {
                const data = await res.json();
                setTimeout(() => {
                    if (data.status === "Success") {
                        dispatch(login());
                        navigate("/dashboard");
                    }
                }, 100);
            } else {
                alert("Invalid username or password");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Something went wrong. Try again later.");
        }
    };
    return(
        <div>
        <div>
    <ul className={styles["bg-circles"]}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>

    {/* // <!-- Login form --> */}
    <div className={styles["login-container"]}>
        <div className={styles["login-card"]}>
            <div className={styles["login-header"]}>
                <div className={styles["login-logo"]}>🔒</div>
                <h1 className={styles["login-title"]}>Welcome Back</h1>
                <p className={styles["login-subtitle"]}>Please enter your credentials to login</p>
            </div>
            <form onSubmit={handleLogin}>
                <div className={styles["form-group"]}>
                    <label className={styles["form-label"]}>Username</label>
                    <input type="text" className={styles["form-control"]} placeholder="Enter your username" ref={usernameRef}/>
                </div>
                <div className={styles["form-group"]}>
                    <label className={styles["form-label"]}>Password</label>
                    <input type="password" className={styles["form-control"]} placeholder="Enter your password" ref={passwordRef}/>
                </div>
                <div className={styles["login-footer"]}>
                    <a href="#" className={styles["forgot-password"]}>Forgot password?</a>
                </div>
                <button type="submit" className={styles["btn-login"]}>Login</button>
            </form>
        </div>
    </div>
    </div>
        </div>
    )
}
export default CTO_Login;