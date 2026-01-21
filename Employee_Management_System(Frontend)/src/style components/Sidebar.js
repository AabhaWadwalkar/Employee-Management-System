import React from 'react';
import styles from '../css/Sidebar.module.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
            <div className={styles["sidebar-header"]}>
                <div className={styles["sidebar-title"]}>
                    <span>Menu</span>
                    <button className={styles["toggle-btn"]} onClick={toggleSidebar}>≡</button>
                </div>
            </div>
            
            <div className={styles["nav-item"]}>
                <a href="/dashboard" className={styles["nav-link"]}>
                    <span className={styles["nav-icon"]}>⌂</span>
                    {isOpen && <span className={styles["nav-text"]}>Dashboard</span>}
                </a>
            </div>
            
            <div className={styles["nav-item"]}>
                <a href="/admin_dashboard" className={styles["nav-link"]}>
                    <span className={styles["nav-icon"]}>👤</span>
                    {isOpen && <span className={styles["nav-text"]}>Admin Dashboard</span>}
                </a>
            </div>
            
            <div className={styles["nav-item"]}>
                <a href="/login" className={styles["nav-link"]}>
                    <span className={styles["nav-icon"]}>📊</span>
                    {isOpen && <span className={styles["nav-text"]}>Login</span>}
                </a>
            </div>
            
            <div className={styles["nav-item"]}>
                <a href="/Employee_login" className={styles["nav-link"]}>
                    <span className={styles["nav-icon"]}>⚙</span>
                    {isOpen && <span className={styles["nav-text"]}>Employee Login</span>}
                </a>
            </div>

            <div className={styles["nav-item"]}>
                <a href="/team-info" className={styles["nav-link"]}>
                    <span className={styles["nav-icon"]}>🔒</span>
                    {isOpen && <span className={styles["nav-text"]}>Team Login</span>}
                </a>
            </div>

            <div className={styles["nav-item"]}>
                <a href="/addform" className={styles["nav-link"]}>
                    <span className={styles["nav-icon"]}>🔒</span>
                    {isOpen && <span className={styles["nav-text"]}>Add Form</span>}
                </a>
            </div>
            
            <div className={styles["nav-item"]}>
                <a href="/deletedemployees" className={styles["nav-link"]}>
                    <span className={styles["nav-icon"]}>📁</span>
                    {isOpen && <span className={styles["nav-text"]}>Deleted Employees</span>}
                </a>
            </div>
            
            <div className={styles["nav-item"]}>
                <a href="/logout" className={styles["nav-link"]}>
                    <span className={styles["nav-icon"]}>🔒</span>
                    {isOpen && <span className={styles["nav-text"]}>Log Out</span>}
                </a>
            </div>
        </div>
    );
};

export default Sidebar;

