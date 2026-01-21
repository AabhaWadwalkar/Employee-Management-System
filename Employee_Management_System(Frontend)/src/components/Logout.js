import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {logout} from '../store/store';
import styles from '../css/Logout.module.css';
import { useDispatch } from "react-redux";



const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const login = () => {
        navigate("/")
    }

    useEffect(()=>{
        dispatch(logout());
        navigate('/logout');
    },[dispatch, navigate]);

    return (
        // <div>
        //     <h1>You have been Logged Out</h1>
        //     <h3>Please Log In to view the application</h3>
        //     <button onClick={login}>Log In</button>
        // </div>
    <div className={styles["logout-container"]}>
        <div className={styles["logout-card"]}>
            <div className={styles["logout-icon"]}>🔒</div>
            <h1 className={styles["logout-title"]}>You have been logged out</h1>
            <p className={styles["logout-message"]}>Your session has been securely terminated. Please log in again to access your account.</p>
            <button className={styles["btn-login"]} onClick={login} type="button">Login Again</button>
            <div className={styles["countdown"]}>Redirecting to login in <span id="countdown">5</span> seconds...</div>
        </div>
    </div>



    )
}
export default Logout;