// The Team member which is in any team can login and it will show the member its assigned tasks -> employee_task page
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../css/Login.module.css';


const Employee_Login = () => {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const enteredusername = usernameRef.current.value;
        const enteredpassword = passwordRef.current.value;

        try {
            const res = await fetch("http://localhost:8000/Employee_login", {
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
                    if (data && data.team && data.member_info) {
                        navigate("/employee_task", {
                            state: {
                                employee: data.employee,
                                team: data.team,
                                member_info: data.member_info,
                            },
                        });
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

    return (
    //     <div style={{width: "100%", background: "#F7F7F7", height:"100vh"}}>
    //     <div className="login-wrapper">
    //       <div className="login-form">
    //         <section className="login-content">
    //           <form onSubmit={handleLogin}>
    //             <h1>Employee Login Form</h1>
    //             <div>
    //               <input className="form-control" type="text" placeholder="Username" ref={usernameRef}/>
    //             </div>
    //             <div>
    //               <input className="form-control" type="text" placeholder="Password" ref={passwordRef}/>
    //             </div>
    //             <button type="submit" className="btn btn-secondary">Login</button>
    //           </form>
    //         </section>
    //       </div>
    //     </div>   
    // </div>
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
    );
};

export default Employee_Login;
