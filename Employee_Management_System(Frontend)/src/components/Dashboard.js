import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout} from "../store/store";
import Sidebar from "../style components/Sidebar";
import TopNavbar from "../style components/TopNavbar.";
import Graph from "../style components/Graph";
import Task_List from "./Task_List";
import styles from '../css/Dashboard.module.css';

function Dashboard() {
  const { isAuthenticated, wasLoggedOut } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const Logout =()=>{
    dispatch(logout());
    navigate('/logout');
  }


  return (
    <div>
      {wasLoggedOut && !isAuthenticated && (
        <div>
     <Logout/>
        </div>
      )}
      {isAuthenticated? (
              <div className={styles["dashboard-wrapper"]}>
              <TopNavbar />
              <div className={`d-flex ${styles["dashboard-body"]}`}>
                <Sidebar />
                <div className={`d-flex ${styles["main-content"]}`}>
                  <Graph />
                  <Task_List />
                </div>
              </div>
              <button onClick={Logout}>Logout</button>
            </div>
      ):(
        <div>
       
       <Logout/>
      </div>
      )}

    </div>
  );
}

export default Dashboard;


