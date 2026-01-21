// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import styles from '../css/Employee_Task.module.css';
// import { useDispatch } from "react-redux";
// import { logout } from "../store/store";

// const Employee_Task = () => {
//     const location = useLocation();
//     // const { employee } = location.state || {};
//     const employee = location.state?.employee;
//     const [data, setData] = useState({});
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetch(`http://localhost:8000/gettask?employee_id=${employee._id}`)
//             .then((response) => {
//                 console.log(response);
//                 if (!response.ok) {
//                     throw new Error("Failed to display task");
//                 }
//                 return response.json();
//             })
//             .then((info) => {
//                 console.log(info);
//                 setData(info);
//             })
//             .catch((error) => {
//                 console.error(error)
//             })
//     }, [employee._id])

//     if (!employee) {
//         return <div>Employee not found. Please log in again.</div>;
//     }

//     const complete = (taskToComplete) => {
//         const payload = {
//             _id: taskToComplete._id,
//             status: "Completed"
//         };
    

    
//         fetch("http://localhost:8000/updatetask", {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(payload)
//         })
//         .then(res => {
//             if (!res.ok) throw new Error("Failed to update task");
//             return res.json();
//         })
//         .then(() => {
//             const updatedData = data.map(task =>
//                 task._id === taskToComplete._id ? { ...task, status: "Completed" } : task
//             );
//             setData(updatedData);
//         })
//         .catch(err => {
//             console.error("Error updating task:", err);
//         });
//     };

//     const LOGOUT =()=>{
//         dispatch(logout());
//         navigate("/logout");
//     }

//     return (
//       <div>
//         <div>
//             <div className={styles["employee-task-container"]}>
//                 <div className={styles["employee-header"]}>
//                     <div className={styles["employee-info"]}>
//                         <div className={styles["info-item"]}>
//                             <span className={styles["info-label"]}>Employee Name</span>
//                             <div className={styles["info-value"]}>{employee.name}</div>
//                         </div>
//                         <div className={styles["info-item"]}>
//                             <span className={styles["info-label"]}>Designation</span>
//                             <div className={styles["info-value"]}>{employee.designation}</div>
//                         </div>
//                         <div className={styles["info-item"]}>
//                             <span className={styles["info-label"]}>Email</span>
//                             <div className={styles["info-value"]}>{employee.email_id}</div>
//                         </div>
//                         <div className={styles["info-item"]}>
//                             <span className={styles["info-label"]}>Salary</span>
//                             <div className={styles["info-value"]}>{employee.salary}</div>
//                         </div>
//                     </div>
//                     <button onClick={LOGOUT}>Logout</button>
//                 </div>

//                 <div className={styles["tasks-section"]}>
//                     <h2 className={styles["section-title"]}>Assigned Tasks</h2>
//                     {Array.isArray(data) && data.length > 0?(
//                         data.map((task) => (
//                             <div className={styles["task-list"]}>
//                                 <div className={styles["task-card"]}>
//                                     <div className={styles["task-header"]}>
//                                         <h3 className={styles["task-title"]}>{task.Task}</h3>
//                                         <span className={styles["task-status status-completed"]}>{task.status}</span>
//                                     </div>
//                                     <div className={styles["task-details"]}>
//                                         {task.Description}
//                                     </div>
//                                     <div className={styles["task-footer"]}>
//                                         <span className={styles["task-date"]}>{task.End_date}</span>
//                                         <div className={styles["task-actions"]}>
//                                             <button className="task-btn btn-edit" onClick={() => complete(task)}>Complete</button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     ):(<p>No Tasks Assigned</p>)}


//                     {/* <div class="task-card">
//                         <div class="task-header">
//                             <h3 class="task-title">Database Optimization</h3>
//                             <span class="task-status status-pending">Pending</span>
//                         </div>
//                         <div class="task-details">
//                             Optimize the MongoDB queries and add proper indexing to improve performance.
//                         </div>
//                         <div class="task-footer">
//                             <span class="task-date">Due: 25 Jun 2023</span>
//                             <div class="task-actions">
//                                 <button class="task-btn btn-complete">Mark Complete</button>
//                                 <button class="task-btn btn-edit">Edit</button>
//                             </div>
//                         </div>
//                     </div>

//                     <div class="task-card">
//                         <div class="task-header">
//                             <h3 class="task-title">API Documentation</h3>
//                             <span class="task-status status-overdue">Overdue</span>
//                         </div>
//                         <div class="task-details">
//                             Create comprehensive API documentation using Swagger for all endpoints.
//                         </div>
//                         <div class="task-footer">
//                             <span class="task-date">Due: 10 Jun 2023</span>
//                             <div class="task-actions">
//                                 <button class="task-btn btn-complete">Mark Complete</button>
//                                 <button class="task-btn btn-edit">Edit</button>
//                             </div>
//                         </div>
//                     </div> */}
//                 </div>
//             </div>
//         </div>

//     {/* <!-- Task Detail Modal --> */ }
//     {/* <div class="modal-overlay" id="taskModal">
//         <div class="modal">
//             <button class="modal-close" id="closeTaskModal">&times;</button>
//             <div class="modal-header">
//                 <h2 class="modal-title">Task Details</h2>
//             </div>
//             <div class="form-group">
//                 <label class="form-label">Task Title</label>
//                 <div class="info-value">Implement User Authentication</div>
//             </div>
//             <div class="form-group">
//                 <label class="form-label">Description</label>
//                 <div class="info-value" style="min-height: 100px;">
//                     Implement JWT authentication for the admin dashboard with role-based access control.
//                     Ensure all endpoints are properly secured and implement refresh token functionality.
//                 </div>
//             </div>
//             <div class="form-group">
//                 <label class="form-label">Status</label>
//                 <div class="info-value">Completed</div>
//             </div>
//             <div class="form-group">
//                 <label class="form-label">Assigned Date</label>
//                 <div class="info-value">01 Jun 2023</div>
//             </div>
//             <div class="form-group">
//                 <label class="form-label">Due Date</label>
//                 <div class="info-value">15 Jun 2023</div>
//             </div>
//             <div class="modal-footer">
//                 <button type="button" class="task-btn btn-edit" id="closeTaskBtn">Close</button>
//             </div>
//         </div>
//     </div> */}
// </div >


//     )
// }
// export default Employee_Task;
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from '../css/Employee_Task.module.css'; // Your CSS Module
import { useDispatch } from "react-redux";
import { logout } from "../store/store"; // Assuming 'logout' action is in your store
import Button from 'react-bootstrap/Button'; // For modal buttons
import Modal from 'react-bootstrap/Modal'; // For task detail modal

const Employee_Task = () => {
    const location = useLocation();
    const employee = location.state?.employee;
    const [tasks, setTasks] = useState([]); // Renamed 'data' to 'tasks' for clarity
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!employee?._id) {
            setError("Employee ID not found. Please log in again.");
            setLoading(false);
            return;
        }

        fetch(`http://localhost:8000/gettask?employee_id=${employee._id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((info) => {
                setTasks(info);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching tasks:", err);
                setError("Failed to load tasks. " + err.message);
                setLoading(false);
            });
    }, [employee?._id]); // Depend on employee._id

    const completeTask = (taskToComplete) => {
        const payload = {
            _id: taskToComplete._id,
            status: "Completed"
        };

        fetch("http://localhost:8000/updatetask", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error("Failed to update task status");
            }
            return res.json();
        })
        .then(() => {
            // Update the state to reflect the completed task
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task._id === taskToComplete._id ? { ...task, status: "Completed" } : task
                )
            );
            // If the detail modal is open for this task, update its status too
            if (selectedTask && selectedTask._id === taskToComplete._id) {
                setSelectedTask(prev => ({ ...prev, status: "Completed" }));
            }
        })
        .catch(err => {
            console.error("Error updating task:", err);
            alert("Failed to mark task as complete: " + err.message);
        });
    };

    const LOGOUT = () => {
        dispatch(logout());
        navigate("/logout");
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setShowDetailModal(true);
    };

    const handleCloseDetailModal = () => {
        setShowDetailModal(false);
        setSelectedTask(null);
    };

    if (loading) {
        return (
            <div className={styles["loading-container"]}>
                <div className={styles["spinner"]}></div>
                <p className={styles["loading-text"]}>Loading employee tasks...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles["error-container"]}>
                <p className={styles["error-message"]}>{error}</p>
                <Button onClick={() => navigate('/')} className={styles["back-home-btn"]}>Go to Home</Button>
            </div>
        );
    }

    if (!employee) {
        return (
            <div className={styles["error-container"]}>
                <p className={styles["error-message"]}>Employee data not found. Please log in again.</p>
                <Button onClick={() => navigate('/')} className={styles["back-home-btn"]}>Go to Home</Button>
            </div>
        );
    }

    return (
        <div className={styles["employee-portal-wrapper"]}>
            <div className={styles["employee-task-container"]}>
                <div className={styles["employee-header"]}>
                    <div className={styles["employee-info-grid"]}>
                        <div className={styles["info-item"]}>
                            <span className={styles["info-label"]}>Employee Name</span>
                            <div className={styles["info-value"]}>{employee.name}</div>
                        </div>
                        <div className={styles["info-item"]}>
                            <span className={styles["info-label"]}>Designation</span>
                            <div className={styles["info-value"]}>{employee.designation}</div>
                        </div>
                        <div className={styles["info-item"]}>
                            <span className={styles["info-label"]}>Email</span>
                            <div className={styles["info-value"]}>{employee.email_id}</div>
                        </div>
                        <div className={styles["info-item"]}>
                            <span className={styles["info-label"]}>Salary</span>
                            <div className={styles["info-value"]}>${employee.salary ? employee.salary.toLocaleString() : 'N/A'}</div>
                        </div>
                    </div>
                    <button onClick={LOGOUT} className={styles["logout-btn"]}>Logout</button>
                </div>

                <div className={styles["tasks-section"]}>
                    <h2 className={styles["section-title"]}>Assigned Tasks</h2>
                    {Array.isArray(tasks) && tasks.length > 0 ? (
                        <div className={styles["task-grid"]}>
                            {tasks.map((task) => (
                                <div key={task._id} className={styles["task-card"]} onClick={() => handleTaskClick(task)}>
                                    <div className={styles["task-card-header"]}>
                                        <h3 className={styles["task-title"]}>{task.Task}</h3>
                                        <span className={`${styles["task-status"]} ${styles[`status-${task.status?.toLowerCase().replace(/\s/g, '-')}`]}`}>
                                            {task.status}
                                        </span>
                                    </div>
                                    <div className={styles["task-description"]}>
                                        {task.Description.substring(0, 100)}{task.Description.length > 100 ? '...' : ''}
                                    </div>
                                    <div className={styles["task-footer"]}>
                                        <span className={styles["task-date"]}>Due: {task.End_date}</span>
                                        {task.status !== "Completed" && (
                                            <button
                                                className={styles["complete-btn"]}
                                                onClick={(e) => { e.stopPropagation(); completeTask(task); }}
                                            >
                                                Mark Complete
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className={styles["no-tasks-message"]}>No tasks assigned to this employee.</p>
                    )}
                </div>
            </div>

            {/* Task Detail Modal */}
            <Modal show={showDetailModal} onHide={handleCloseDetailModal} centered dialogClassName={styles["custom-modal"]}>
                <Modal.Header closeButton className={styles["modal-header"]}>
                    <Modal.Title className={styles["modal-title"]}>{selectedTask?.Task}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles["modal-body"]}>
                    <div className={styles["modal-info-group"]}>
                        <span className={styles["modal-info-label"]}>Description:</span>
                        <p className={styles["modal-info-value"]}>{selectedTask?.Description}</p>
                    </div>
                    <div className={styles["modal-info-group"]}>
                        <span className={styles["modal-info-label"]}>Status:</span>
                        <span className={`${styles["modal-info-value"]} ${styles[`status-${selectedTask?.status?.toLowerCase().replace(/\s/g, '-')}`]}`}>
                            {selectedTask?.status}
                        </span>
                    </div>
                    <div className={styles["modal-info-group"]}>
                        <span className={styles["modal-info-label"]}>Due Date:</span>
                        <span className={styles["modal-info-value"]}>{selectedTask?.End_date}</span>
                    </div>
                </Modal.Body>
                <Modal.Footer className={styles["modal-footer"]}>
                    {selectedTask?.status !== "Completed" && (
                        <Button
                            variant="success"
                            onClick={() => { completeTask(selectedTask); handleCloseDetailModal(); }}
                            className={styles["modal-complete-btn"]}
                        >
                            Mark Complete
                        </Button>
                    )}
                    <Button variant="secondary" onClick={handleCloseDetailModal} className={styles["modal-close-btn"]}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Employee_Task;
