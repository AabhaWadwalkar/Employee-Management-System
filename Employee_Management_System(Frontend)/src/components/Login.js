import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {login} from '../store/store';
import styles from '../css/Login.module.css';

const Login = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (username, password) => {
    try {
      const res = await fetch("http://localhost:8000/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      // dispatch(actions.storeCredentials({ username: data.employee.username, password: data.employee.password }));

      localStorage.setItem("UserData", JSON.stringify({ username, password }));

      if (data.status === "normal") {
        navigate("/employee_task", { state: { employee: data.employee } });
      } else if (data.status === "team") {
        if (data.team.leader_id === data.employee._id) {
          navigate("/team-info", {
            state: {
              employee: data.employee,
              team: data.team,
              members_info: data.members_info
            }
          });
        } else {
          navigate("/employee_task", {
            state: {
              employee: data.employee,
              team: data.team,
              members_info: data.members_info
            }
          });
        }
      }
    } catch (error) {
      alert("Invalid credentials or server error");
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    handleLogin(username, password);
    dispatch(login());
  };

  return (
    <div>
      <ul className={styles["bg-circles"]}>
        <li></li><li></li><li></li><li></li><li></li><li></li>
      </ul>

      <div className={styles["login-container"]}>
        <div className={styles["login-card"]}>
          <div className={styles["login-header"]}>
            <div className={styles["login-logo"]}>🔒</div>
            <h1 className={styles["login-title"]}>Welcome Back</h1>
            <p className={styles["login-subtitle"]}>Please enter your credentials to login</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles["form-group"]}>
              <label className={styles["form-label"]}>Username</label>
              <input type="text" className={styles["form-control"]} placeholder="Enter your username" ref={usernameRef} />
            </div>
            <div className={styles["form-group"]}>
              <label className={styles["form-label"]}>Password</label>
              <input type="password" className={styles["form-control"]} placeholder="Enter your password" ref={passwordRef} />
            </div>
            <div className={styles["login-footer"]}>
              <a href="/" className={styles["forgot-password"]}>Forgot password?</a>
            </div>
            <button type="submit" className={styles["btn-login"]}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;


