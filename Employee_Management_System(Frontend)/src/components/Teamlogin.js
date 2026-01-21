// import React, { useRef, useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// // import { actions } from "../store/store";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
// import styles from '../css/TeamLogin.module.css';
// import { logout } from "../store/store";

// const Teamlogin = () => {
//     const [display, setDisplay] = useState(false);
//     const [selectedMember, setSelectedMember] = useState(null);
//     const [memberTaskCounts, setMemberTaskCounts] = useState({});
//     const task = useRef();
//     const description = useRef();
//     const enddate = useRef();
//     const dispatch = useDispatch();
//     const location = useLocation();
//     const navigate = useNavigate();

//     const team = location.state?.team;
//     const members_info = location.state?.members_info;

//     useEffect(() => {
//         const fetchTaskCounts = async () => {
//             try {
//                 const counts = {};
//                 for (let member of members_info || []) {
//                     const res = await fetch(`http://localhost:8000/taskcount?emp_id=${member._id}`);
//                     const data = await res.json();
//                     counts[member._id] = data.count;
//                 }
//                 setMemberTaskCounts(counts);
//             } catch (error) {
//                 console.error("Error fetching task counts:", error);
//             }
//         };

//         fetchTaskCounts();
//     }, [members_info]);

//     if (!team || !members_info) {
//         return <p>Team info not found</p>
//     }

//     const leaderId = team.leader_id;
//     const leader = members_info.find((emp) => emp._id === leaderId);
//     const members = members_info.filter((emp) => emp._id !== leaderId);

//     const handleShow = (member) => {
//         setSelectedMember(member);
//         setDisplay(true);
//     };
//     const handleClose = () => setDisplay(false);

//     const submitTask = () => {
//         const detail = {
//             Emp_id: selectedMember._id,
//             Team_code: team.team_code,
//             Task: task.current.value,
//             Description: description.current.value,
//             End_date: enddate.current.value
//             // status: status.current.value
//         };

//         fetch(`http://localhost:8000/addtask`, {
//             headers: { 'Content-Type': 'application/json' },
//             method: "POST",
//             body: JSON.stringify(detail),
//         }).then((response) => {
//             if (response.ok) {
//                 console.log("Task added successfully");
//                 navigate("/employee_task", {
//                     state: { task: detail, employee: selectedMember }
//                 });
//             } else {
//                 console.log("Failed to add task");
//             }
//         });
//     };

//     const LOGOUT=()=>{
//         dispatch(logout());
//         navigate('/logout');
//     }

//     return (
//         <div className={styles["team-login-container"]}>
//             <div className={styles["team-header"]}>
//                 <h1 className={styles["team-title"]}>Team Leader</h1>
//                 <p className={styles["team-subtitle"]}>Engineering Team Dashboard</p>
//                 <button onClick={LOGOUT}>LogOut</button>
//             </div>

//             <div className={`row ${styles["team-content"]}`}>
//                 {/* Team Info */}
//                 <div className={`col-6 ${styles["team-info"]}`}>
//                     <div className={styles["info-group"]}>
//                         <span className={styles["info-label"]}>Team Code</span>
//                         <div className={styles["info-value"]}>{team.team_code}</div>
//                     </div>
//                     <div className={styles["info-group"]}>
//                         <span className={styles["info-label"]}>Leader ID</span>
//                         <div className={styles["info-value"]}>{team.leader_id}</div>
//                     </div>
//                     <div className={styles["info-group"]}>
//                         <span className={styles["info-label"]}>Team Leader</span>
//                         <div className={styles["info-value"]}>{leader?.name}</div>
//                     </div>
//                     <div className={styles["info-group"]}>
//                         <span className={styles["info-label"]}>Designation</span>
//                         <div className={styles["info-value"]}>{leader?.designation}</div>
//                     </div>
//                     <div className={styles["info-group"]}>
//                         <span className={styles["info-label"]}>Email ID</span>
//                         <div className={styles["info-value"]}>{leader?.email_id}</div>
//                     </div>
//                     <div className={styles["info-group"]}>
//                         <span className={styles["info-label"]}>Salary</span>
//                         <div className={styles["info-value"]}>{leader?.salary}</div>
//                     </div>
//                     <div className={styles["info-group"]}>
//                         <span className={styles["info-label"]}>Status</span>
//                         <div className={styles["info-value"]}>
//                             <span className={styles["status-badge"]}>Active</span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Team Members */}
//                 <div className={`col-6 ${styles["team-members"]}`}>
//                     <h3 className={styles["members-title"]}>Team Members</h3>
//                     {members.map((member) => (
//                         <div key={member._id} className={styles["member-card"]}>
//                             <div className={styles["member-details"]}>
//                                 <div className={styles["member-item"]}>
//                                     <div className={styles["member-name"]}>Name:</div>
//                                     <div className={styles["member-role"]}>{member.name}</div>
//                                     <button className="btn btn-secondary" onClick={() => handleShow(member)}>Assign Task</button>
//                                 </div>
//                                 <div className={styles["member-item"]}>
//                                     <div className={styles["member-name"]}>Designation:</div>
//                                     <div className={styles["member-role"]}>{member.designation}</div>
//                                     <span>Tasks: {memberTaskCounts[member._id] || 0}</span>
//                                 </div>
//                                 <div className={styles["member-item"]}>
//                                     <div className={styles["member-name"]}>Email ID:</div>
//                                     <div className={styles["member-role"]}>{member.email_id}</div>
//                                 </div>
//                                 <div className={styles["member-item"]}>
//                                     <div className={styles["member-name"]}>Salary:</div>
//                                     <div className={styles["member-role"]}>{member.salary}</div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <Modal show={display} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title style={{color: "black"}}>Assign Task to {selectedMember?.name}</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form>
//                         <Form.Group className="mb-3">
//                             <Form.Label style={{color: "black"}}>Task</Form.Label>
//                             <Form.Control type="text" ref={task} autoFocus />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label style={{color: "black"}}>Description</Form.Label>
//                             <Form.Control type="text" ref={description} />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label style={{color: "black"}}>End Date</Form.Label>
//                             <Form.Control type="text" ref={enddate} />
//                         </Form.Group>
//                         {/* <Form.Group className="mb-3">
//                             <Form.Label style={{color: "black"}}>Status</Form.Label>
//                             <Form.Control type="text" ref={status} />
//                         </Form.Group> */}
//                         <Button onClick={submitTask}>Assign</Button>
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>Close</Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };

// export default Teamlogin;

import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/store"; // Assuming 'logout' action is in your store
import 'bootstrap/dist/css/bootstrap.min.css'; // Keep Bootstrap for grid and modal base
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import styles from '../css/TeamLogin.module.css'; // Your CSS Module

const Teamlogin = () => {
    const [display, setDisplay] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [memberTaskCounts, setMemberTaskCounts] = useState({});
    const task = useRef();
    const description = useRef();
    const enddate = useRef();
    // const status = useRef(); // Uncomment if you re-add status to the form
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const team = location.state?.team;
    const members_info = location.state?.members_info;

    useEffect(() => {
        const fetchTaskCounts = async () => {
            try {
                const counts = {};
                for (let member of members_info || []) {
                    const res = await fetch(`http://localhost:8000/taskcount?emp_id=${member._id}`);
                    const data = await res.json();
                    counts[member._id] = data.count;
                }
                setMemberTaskCounts(counts);
            } catch (error) {
                console.error("Error fetching task counts:", error);
            }
        };

        fetchTaskCounts();
    }, [members_info]);

    if (!team || !members_info) {
        return (
            <div className={styles["info-message-container"]}>
                <p className={styles["info-message"]}>Team information not found. Please navigate from a valid team selection.</p>
                <Button variant="secondary" onClick={() => navigate('/')} className={styles["back-home-btn"]}>Go to Home</Button>
            </div>
        );
    }

    const leaderId = team.leader_id;
    const leader = members_info.find((emp) => emp._id === leaderId);
    const members = members_info.filter((emp) => emp._id !== leaderId);

    const handleShow = (member) => {
        setSelectedMember(member);
        setDisplay(true);
    };
    const handleClose = () => setDisplay(false);

    const submitTask = () => {
        if (!selectedMember || !task.current.value || !description.current.value || !enddate.current.value) {
            alert("Please fill all task details.");
            return;
        }

        const detail = {
            Emp_id: selectedMember._id,
            Team_code: team.team_code,
            Task: task.current.value,
            Description: description.current.value,
            End_date: enddate.current.value,
            // status: status.current.value || "Pending" // Default status if not used
        };

        fetch(`http://localhost:8000/addtask`, {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(detail),
        }).then((response) => {
            if (response.ok) {
                console.log("Task added successfully");
                // Optimistically update task count
                setMemberTaskCounts(prevCounts => ({
                    ...prevCounts,
                    [selectedMember._id]: (prevCounts[selectedMember._id] || 0) + 1
                }));
                handleClose();
                // Optionally navigate or show a success message
                // navigate("/employee_task", { state: { task: detail, employee: selectedMember } });
            } else {
                console.log("Failed to add task");
                alert("Failed to add task. Please try again.");
            }
        }).catch(error => {
            console.error("Error submitting task:", error);
            alert("An error occurred while adding the task.");
        });
    };

    const LOGOUT = () => {
        dispatch(logout()); // Dispatch your logout action
        navigate('/logout'); // Navigate to a logout confirmation or home page
    }

    return (
        <div className={styles["team-login-wrapper"]}> {/* New wrapper for overall padding */}
            <div className={styles["team-login-container"]}>
                <div className={styles["team-header"]}>
                    <h1 className={styles["team-title"]}>Team Leader Dashboard</h1>
                    <p className={styles["team-subtitle"]}>Overview for {team.team_code}</p>
                    <button onClick={LOGOUT} className={styles["logout-btn"]}>Log Out</button>
                </div>

                <div className={`row ${styles["team-content"]}`}>
                    {/* Team Info Card */}
                    <div className={`col-lg-5 col-md-12 ${styles["info-card"]}`}>
                        <h3 className={styles["card-section-title"]}>Team Leader Details</h3>
                        <div className={styles["info-group"]}>
                            <span className={styles["info-label"]}>Team Code</span>
                            <div className={styles["info-value"]}>{team.team_code}</div>
                        </div>
                        <div className={styles["info-group"]}>
                            <span className={styles["info-label"]}>Leader ID</span>
                            <div className={styles["info-value"]}>{team.leader_id}</div>
                        </div>
                        <div className={styles["info-group"]}>
                            <span className={styles["info-label"]}>Team Leader</span>
                            <div className={styles["info-value"]}>{leader?.name || 'N/A'}</div>
                        </div>
                        <div className={styles["info-group"]}>
                            <span className={styles["info-label"]}>Designation</span>
                            <div className={styles["info-value"]}>{leader?.designation || 'N/A'}</div>
                        </div>
                        <div className={styles["info-group"]}>
                            <span className={styles["info-label"]}>Email ID</span>
                            <div className={styles["info-value"]}>{leader?.email_id || 'N/A'}</div>
                        </div>
                        <div className={styles["info-group"]}>
                            <span className={styles["info-label"]}>Salary</span>
                            <div className={styles["info-value"]}>${leader?.salary ? leader.salary.toLocaleString() : 'N/A'}</div>
                        </div>
                        <div className={styles["info-group"]}>
                            <span className={styles["info-label"]}>Status</span>
                            <div className={styles["info-value"]}>
                                <span className={styles["status-badge"]}>Active</span>
                            </div>
                        </div>
                    </div>

                    {/* Team Members List */}
                    <div className={`col-lg-7 col-md-12 ${styles["members-list-card"]}`}>
                        <h3 className={styles["card-section-title"]}>Team Members</h3>
                        <div className={styles["members-grid"]}>
                            {members.length > 0 ? (
                                members.map((member) => (
                                    <div key={member._id} className={styles["member-card"]}>
                                        <div className={styles["member-header-section"]}>
                                            <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${member.name}`} alt="Avatar" className={styles["member-avatar"]} />
                                            <div className={styles["member-name-role"]}>
                                                <div className={styles["member-name"]}>{member.name}</div>
                                                <div className={styles["member-role"]}>{member.designation}</div>
                                            </div>
                                        </div>
                                        <div className={styles["member-details-section"]}>
                                            <div className={styles["detail-item"]}>
                                                <span className={styles["detail-label"]}>Email:</span>
                                                <span className={styles["detail-value"]}>{member.email_id}</span>
                                            </div>
                                            <div className={styles["detail-item"]}>
                                                <span className={styles["detail-label"]}>Tasks Assigned:</span>
                                                <span className={styles["detail-value-highlight"]}>{memberTaskCounts[member._id] || 0}</span>
                                            </div>
                                        </div>
                                        <button className={styles["assign-task-btn"]} onClick={() => handleShow(member)}>Assign Task</button>
                                    </div>
                                ))
                            ) : (
                                <p className={styles["no-members-message"]}>No other members found in this team.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Assign Task Modal */}
            <Modal show={display} onHide={handleClose} centered dialogClassName={styles["custom-modal"]}>
                <Modal.Header closeButton className={styles["modal-header"]}>
                    <Modal.Title className={styles["modal-title"]}>Assign Task to {selectedMember?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles["modal-body"]}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className={styles["form-label"]}>Task Title</Form.Label>
                            <Form.Control type="text" ref={task} autoFocus className={styles["form-control"]} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className={styles["form-label"]}>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} ref={description} className={styles["form-control"]} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className={styles["form-label"]}>End Date</Form.Label>
                            <Form.Control type="date" ref={enddate} className={styles["form-control"]} />
                        </Form.Group>
                        {/* <Form.Group className="mb-3">
                            <Form.Label className={styles["form-label"]}>Status</Form.Label>
                            <Form.Control type="text" ref={status} defaultValue="Pending" className={styles["form-control"]} />
                        </Form.Group> */}
                    </Form>
                </Modal.Body>
                <Modal.Footer className={styles["modal-footer"]}>
                    <Button variant="secondary" onClick={handleClose} className={styles["btn-secondary"]}>Cancel</Button>
                    <Button variant="primary" onClick={submitTask} className={styles["btn-primary"]}>Assign</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Teamlogin;
