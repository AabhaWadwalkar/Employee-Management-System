import React, { useDebugValue, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from '../style components/Sidebar';
import TopNavbar from "../style components/TopNavbar.";
import styles from '../css/AddForm.module.css';
import { logout } from "../store/store";
import { useDispatch } from "react-redux";


function AddForm() {
    const navigate = useNavigate();
    const name = useRef();
    const designation = useRef();
    const email_id = useRef();
    const salary = useRef();
    const dispatch = useDispatch();


   
    const Submitform = () => {
        let details ={
            "name": name.current.value,
            "designation": designation.current.value,
            "email_id": email_id.current.value,
            "salary": parseFloat(salary.current.value),
        }

            fetch("http://localhost:8000/addEmployee",{
                headers:{
                    'Content-Type':'application/json',
                },
                method: "POST",
                body:JSON.stringify(details),
                // body:details
                // details
            }).then((response) => {
                  if(response.ok){
                    console.log("Employee added successfully");
                    navigate("/");
                  }else{
                    console.log("Failed to add employee")
                  }
                })
    
    }
    const LOGOUT = ()=>{
        dispatch(logout());
        navigate('/logout');
    }


    return (
<div>

<TopNavbar/>
    <div className={styles["form-container"]}>
        

    <div className="row">
        <div className="col-2">
        <Sidebar/>
        </div>
        {/* </div> */}
        {/* <div className="main-content"> */}
            
        {/* </div> */}

        {/* <div class="main-content">
            <!-- Top Navigation (same as dashboard) -->
            <div class="top-nav">
                <!-- Nav content would go here -->
            </div> */}

            {/* <!-- Form Content --> */}
            <div className={`col-8 ${styles["form-content"]}`}>
                <div className={styles["form-panel"]}>
                    <h2 className={styles["form-title"]}>Add New Employee</h2>
                    <form>
                        <div className={styles["form-group"]}>
                            <label className={styles["form-label"]}>Name <span required>*</span></label>
                            <input type="text" className={styles["form-control"]} ref={name} placeholder="Enter full name"/>
                        </div>

                        <div className={styles["form-group"]}>
                            <label className={styles["form-label"]}>Designation <span required>*</span></label>
                            <input type="text" className={styles["form-control"]} ref={designation} placeholder="Enter designation"/>
                        </div>

                        <div className={styles["form-group"]}>
                            <label className={styles["form-label"]}>Email ID <span required>*</span></label>
                            <input type="email" className={styles["form-control"]} ref={email_id} placeholder="Enter email address"/>
                        </div>

                        <div className={styles["form-group"]}>
                            <label className={styles["form-label"]}>Salary <span required>*</span></label>
                            <input type="number" className={styles["form-control"]} ref={salary} placeholder="Enter salary amount"/>
                        </div>

                        <button type="button" onClick={Submitform} className={styles["btn-submit"]}>Add Employee</button>
                    </form>
                </div>
            </div>
            </div>
        </div>
        <button onClick={LOGOUT}>Logout</button>
        </div>
    )
   

/* 
            <input placeholder="Enter Name" ref={name} />
            <input placeholder="Enter Designation" ref={designation} />
            <input placeholder="Enter Email ID" ref={email_id} />
            <input placeholder="Enter Salary" ref={salary} />
            <button type="button" onClick={Submitform}>Add</button>
            </div>
        </div> */
    
}
export default AddForm;