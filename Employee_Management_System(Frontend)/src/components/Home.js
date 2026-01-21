import React from "react";
import styles from '../css/Home.module.css';
import { useNavigate } from "react-router-dom";

const Home=()=>{
    const navigate = useNavigate();
    const login =()=>{
        navigate("/Login");
    }
    const CTO = ()=>{
        navigate("/CTO_Login");
    }
    return(
    <div className={styles["dashboard-container"]}>
        <div className={styles["page-header"]}>
            <h1 className={styles["page-title"]}>Employee Management System <span className="status-indicator status-active"></span></h1>
            <p className={styles["page-subtitle"]}>Select your role to continue</p>
        </div>

        <div className={styles["auth-cards"]}>
            <div className={styles["auth-card"]}>
                <div className={styles["card-icon"]}>👔</div>
                <h3 className={styles["card-title"]}>Chief Executive</h3>
                <p className={styles["card-description"]}>Access executive dashboards, financial reports, and strategic planning tools.</p>
                <button className={styles["btn"]}>Login as CEO</button>
            </div>
            
            <div className={styles["auth-card"]}>
                <div className={styles["card-icon"]}>🖥️</div>
                <h3 className={styles["card-title"]}>Technical Head</h3>
                <p className={styles["card-description"]}>Manage development teams, technical roadmaps, and system architecture.</p>
                <button className={styles["btn"]} onClick={CTO}>Login as CTO</button>
            </div>
            
            <div className={styles["auth-card"]}>
                <div className={styles["card-icon"]}>🔑</div>
                <h3 className={styles["card-title"]}>Administrator</h3>
                <p className={styles["card-description"]}>Full system access for user management, configurations, and settings.</p>
                <button className={styles["btn"]} onClick={login}>Login as Admin</button>
            </div>
        </div>
    </div>


    )
}
export default Home;





