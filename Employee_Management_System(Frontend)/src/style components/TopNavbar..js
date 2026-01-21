// import React, { useState } from "react";
// import styles from '../css/TopNavbar.module.css';
// import Sidebar from './Sidebar'; // Import Sidebar

// const TopNavbar = () => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar
//     const [isProfileOpen, setIsProfileOpen] = useState(false);
//     const [isNotificationOpen, setIsNotificationOpen] = useState(false);

//     const toggleSidebar = () => {
//         setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar state
//     };
//     const toggleProfile = () => {
//         setIsProfileOpen(!isProfileOpen);
//     };
//     const toggleNotification = () => {
//         setIsNotificationOpen(!isNotificationOpen);
//     }

//     return (
//         <div>
//             <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> {/* Pass props to Sidebar */}
//             <div className={styles["top-nav"]}>
//                 <div className={styles["nav-menu"]}>
//                     <div className={styles["nav toggle"]}>
//                         <button className={styles["toggle-btn"]} onClick={toggleSidebar}>≡</button> {/* Menu button */}
//                     </div>
//                     <nav className={styles["nav navbar-nav"]}>
//                         <ul className={styles["navbar-right"]}>
//                             {/* <li className={styles["nav-item dropdown-open"]}>
//                                 <a className={styles["dropdown-toggle user-profile"]} onClick={toggleProfile}>
//                                     <span>Aabha Wadwalkar</span>
//                                 </a>
//                                 {isProfieOpen && (
//                                     <div className={styles["dropdown-menu"]}>
//                                         <a href="#" className={styles["dropdown-item"]}>Profile</a>
//                                         <a href="#" className={styles["dropdown-item"]}>Settings</a>
//                                         <div className={styles["dropdown-divider"]}></div>
//                                         <a href="#" className={styles["dropdown-item"]}>Logout</a>
//                                     </div>

//                                 )}
//                             </li> */}
//                             {/* <li className={styles["nav-item dropdown-open"]}>
//                                 <a className={styles["dropdown-toggle info-number"]} onClick={toggleNotification}>
//                                     <span>3</span>
//                                 </a>
//                                 {isNotificationOpen && (
//                                     <div className={styles["dropdown-menu"]}>
//                                         <a href="#" className={styles["dropdown-item"]}>New message</a>
//                                         <a href="#" className={styles["dropdown-item"]}>Notification</a>
//                                         <a href="#" className={styles["dropdown-item"]}>Alert</a>
//                                     </div>
//                                 )}

//                             </li> */}
//                             <li className={`${styles["nav-item"]} ${isProfileOpen ? styles["dropdown-open"] : ""}`}>
//     <a className={styles["dropdown-toggle"]} onClick={toggleProfile} style={{ cursor: 'pointer' }}>
//         <span>Aabha Wadwalkar</span>
//     </a>
//     <div className={styles["dropdown-menu"]}>
//         <a href="#" className={styles["dropdown-item"]}>Profile</a>
//         <a href="#" className={styles["dropdown-item"]}>Settings</a>
//         <div className={styles["dropdown-divider"]}></div>
//         <a href="#" className={styles["dropdown-item"]}>Logout</a>
//     </div>
// </li>

// <li className={`${styles["nav-item"]} ${isNotificationOpen ? styles["dropdown-open"] : ""}`}>
//     <a className={styles["dropdown-toggle"]} onClick={toggleNotification} style={{ cursor: 'pointer' }}>
//         <span>3</span>
//     </a>
//     <div className={styles["dropdown-menu"]}>
//         <a href="#" className={styles["dropdown-item"]}>New message</a>
//         <a href="#" className={styles["dropdown-item"]}>Notification</a>
//         <a href="#" className={styles["dropdown-item"]}>Alert</a>
//     </div>
// </li>

//                         </ul>
//                     </nav>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TopNavbar;
import React, { useState, useEffect } from "react";
import styles from '../css/TopNavbar.module.css';
import Sidebar from './Sidebar';
import 'bootstrap-icons/font/bootstrap-icons.css';
const TopNavbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
        setIsNotificationOpen(false); // Close other dropdown
    };

    const toggleNotification = () => {
        setIsNotificationOpen(!isNotificationOpen);
        setIsProfileOpen(false); // Close other dropdown
    };

    // Close dropdowns when clicked outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest(`.${styles["nav-item"]}`)) {
                setIsProfileOpen(false);
                setIsNotificationOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className={styles["top-nav"]}>
                <div className={styles["nav-menu"]}>
                    <div className={styles["nav-toggle"]}>
                        <button className={styles["toggle-btn"]} onClick={toggleSidebar}>≡</button>
                    </div>
                    <nav className={styles["nav navbar-nav"]}>
                        <ul className={styles["navbar-right"]}>
                            {/* Profile Dropdown */}
                            <li className={`${styles["nav-item"]} ${isProfileOpen ? styles["dropdown-open"] : ""}`}>
                                <a className={styles["dropdown-toggle"]} onClick={toggleProfile} style={{ cursor: 'pointer' }}>
                                    <span> <i className="bi bi-person-circle"> </i>Aabha Wadwalkar</span>
                                </a>
                                <div className={styles["dropdown-menu"]}>
                                    <a href="#" className={styles["dropdown-item"]}>Profile</a>
                                    <a href="#" className={styles["dropdown-item"]}>Settings</a>
                                    <div className={styles["dropdown-divider"]}></div>
                                    <a href="#" className={styles["dropdown-item"]}>Logout</a>
                                </div>
                            </li>

                            {/* Notifications Dropdown */}
                            <li className={`${styles["nav-item"]} ${isNotificationOpen ? styles["dropdown-open"] : ""}`}>
                                <a className={styles["dropdown-toggle"]} onClick={toggleNotification} style={{ cursor: 'pointer' }}>
                                    <span>3</span>
                                </a>
                                <div className={styles["dropdown-menu"]}>
                                    <a href="#" className={styles["dropdown-item"]}>New message</a>
                                    <a href="#" className={styles["dropdown-item"]}>Notification</a>
                                    <a href="#" className={styles["dropdown-item"]}>Alert</a>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default TopNavbar;


