import React from "react";
import Sidebar from "../style components/Sidebar";
import TopNavbar from "../style components/TopNavbar.";
import Graph from "../style components/Graph";
import styles from '../css/Admin_Dashboard.module.css';
const Admin_Dashboard=()=>{
    return(

        <div>
        <div>
      <TopNavbar />
      <div className="d-flex">
        <Sidebar />
        <div className="row">
          <Graph/>
          <div className={`col-6 ${styles["form-content"]}`}>
                <div className={styles["form-panel"]}>
                    <h2 className={styles["form-title"]}>Add New Employee</h2>
                    <form>
                        <div className={styles["form-group"]}>
                            <label className={styles["form-label"]}>Name <span required>*</span></label>
                            <input type="text" className={styles["form-control"]} placeholder="Enter full name"/>
                        </div>

                        <div className={styles["form-group"]}>
                            <label className={styles["form-label"]}>Designation <span required>*</span></label>
                            <input type="text" className={styles["form-control"]} placeholder="Enter designation"/>
                        </div>

                        <div className={styles["form-group"]}>
                            <label className={styles["form-label"]}>Email ID <span required>*</span></label>
                            <input type="email" className={styles["form-control"]} placeholder="Enter email address"/>
                        </div>

                        <div className={styles["form-group"]}>
                            <label className={styles["form-label"]}>Salary <span required>*</span></label>
                            <input type="number" className={styles["form-control"]} placeholder="Enter salary amount"/>
                        </div>

                        <button type="submit" className={styles["btn-submit"]}>Add Employee</button>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
        </div>
    )
}
export default Admin_Dashboard;