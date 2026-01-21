// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
// import { Table } from "react-bootstrap";
// import styles from '../css/EmpDetails.module.css';

// function EmpDetails() {
//     const [details, setDetails] = useState({});
//     const name = useRef();
//     const salary = useRef();
//     const email_id = useRef();
//     const designation = useRef();
//     const team_code = useRef();
//     const { _id } = useParams();
//     const [show, setShow] = useState(false);
//     const [display, setDisplay] = useState(false);
//     const handleClose = () => setShow(false);
//     const handleclose = () => setDisplay(false);
//     const handleShow = () => setShow(true);
//     const handleshow = () => setDisplay(true);
//     const navigate = useNavigate();
//     const [employee, setEmployee] = useState([]);
//     const [selectedRows, setSelectedRows] = useState([]);
//     const tableRef = useRef(null); 

//     const handleRowClick = (id) => {
//         setSelectedRows((prevSelected) =>
//             prevSelected.includes(id)
//                 ? prevSelected.filter((item) => item !== id)
//                 : [...prevSelected, id]
//         );
//     };

//     useEffect(() => {
//         fetch(`http://localhost:8000/displayemployees/${_id}`)
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error("Failed to show data");
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 setDetails(data[0]);
//             });
//     }, [_id]);

//     const saveChange = () => {
//         const updatedValues = {
//             "_id": _id,
//             "name": name.current.value,
//             "designation": designation.current.value,
//             "email_id": email_id.current.value,
//             "salary": parseFloat(salary.current.value),
//         };

//         fetch(`http://localhost:8000/admin_update?employee_id=${_id}`, {
//             headers: { 'Content-Type': 'application/json' },
//             method: "PUT",
//             body: JSON.stringify(updatedValues),
//         })
//         .then((response) => {
//             if (response.ok) {
//                 navigate("/");
//             } else {
//                 console.log("Failed to update data");
//             }
//         });
//     };

//     const deletedata = () => {
//         fetch(`http://localhost:8000/UIdelete?employee_id=${_id}`, {
//             method: "PUT",
//         })
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error("failed to remove data");
//             }
//             alert("Are you sure you want to delete?");
//             navigate("/");
//         });
//     };

//     useEffect(() => {
//         fetch("http://localhost:8000/showallEmployee")
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error("Failed to fetch data");
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 setEmployee(data);
//             });
//     }, []);

//     const submitTeam = () => {
//         let detail = {
//             "leader_id": details._id,
//             "team_code": team_code.current.value,
//             "members": {
//                 "mem1": selectedRows[0] || null,
//                 "mem2": selectedRows[1] || null,
//                 "mem3": selectedRows[2] || null,
//                 "mem4": selectedRows[3] || null,
//             },
//         };
//         fetch(`http://localhost:8000/addteam`, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             method: "POST",
//             body: JSON.stringify(detail),
//         })
//         .then((response) => {
//             if (response.ok) {
//                 navigate("/");
//             } else {
//                 console.log("Failed to add team");
//             }
//         });
//     };

//     return (
//         <div className={styles["employee-container"]}>
//             <div className={styles["employee-header"]}>
//                 <h1 className={styles["employee-title"]}>Employee Details</h1>
//                 <div className={styles["action-buttons"]}>
//                     <button className="btn btn-primary" onClick={handleShow}>Update Details</button>
//                     <button className="btn btn-danger" onClick={deletedata}>Delete Employee</button>
//                     <button className="btn btn-primary" onClick={handleshow}>Create Team</button>
//                 </div>
//                 <Modal show={display} onHide={handleclose}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Create Team</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <Form>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Leader ID</Form.Label>
//                                 <div>{details._id}</div>
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Team Code</Form.Label>
//                                 <Form.Control type="text" ref={team_code} autoFocus />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Members</Form.Label>
//                                 <div style={{ height: '200px', overflow: 'scroll' }}>
//                                     <Table striped bordered hover ref={tableRef}>
//                                         <thead>
//                                             <tr>
//                                                 <th>Name</th>
//                                                 <th>Username</th>
//                                                 <th>Password</th>
//                                                 <th>Designation</th>
//                                                 <th>Email ID</th>
//                                                 <th>Salary</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {employee.map((data) => (
//                                                 <tr
//                                                     key={data._id}
//                                                     onClick={() => handleRowClick(data._id)}
//                                                     style={{ cursor: 'pointer' }}
//                                                     className={selectedRows.includes(data._id) ? 'table-primary' : ''}
//                                                 >
//                                                     <td>{data.name}</td>
//                                                     <td>{data.username}</td>
//                                                     <td>{data.password}</td>
//                                                     <td>{data.designation}</td>
//                                                     <td>{data.email_id}</td>
//                                                     <td>{data.salary}</td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </Table>
//                                 </div>
//                             </Form.Group>
//                             <Button onClick={submitTeam}>Submit</Button>
//                         </Form>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={handleclose}>Close</Button>
//                     </Modal.Footer>
//                 </Modal>

//                 <Modal show={show} onHide={handleClose}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Update Details</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <Form>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Name</Form.Label>
//                                 <Form.Control type="text" defaultValue={details?.name || ""} ref={name} autoFocus />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Designation</Form.Label>
//                                 <Form.Control type="text" defaultValue={details?.designation || ""} ref={designation} autoFocus />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Email</Form.Label>
//                                 <Form.Control type="text" defaultValue={details?.email_id || ""} ref={email_id} autoFocus />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Salary</Form.Label>
//                                 <Form.Control type="number" defaultValue={details?.salary || ""} ref={salary} autoFocus />
//                             </Form.Group>
//                         </Form>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={handleClose}>Close</Button>
//                         <Button variant="primary" onClick={saveChange}>Save Changes</Button>
//                     </Modal.Footer>
//                 </Modal>
//             </div>

//             {details && Object.keys(details).length > 0 ? (
//                 <div className={`row ${styles["employee-card"]}`}>
//                     <div className={styles["employee-details"]}>
//                         <div>
//                             <div className={styles["detail-group"]}>
//                                 <span className={styles["detail-label"]}>Full Name</span>
//                                 <div className={`col ${styles["detail-value"]}`}>{details.name}</div>
//                             </div>
//                             <div className={styles["detail-group"]}>
//                                 <span className={styles["detail-label"]}>Username</span>
//                                 <div className={`col ${styles["detail-value"]}`}>{details.username}</div>
//                             </div>
//                             <div className={styles["detail-group"]}>
//                                 <span className={styles["detail-label"]}>Password</span>
//                                 <div className={`col ${styles["detail-value"]}`}>{details.password}</div>
//                             </div>
//                         </div>
//                         <div>
//                             <div className={styles["detail-group"]}>
//                                 <span className={styles["detail-label"]}>Salary</span>
//                                 <div className={`col ${styles["detail-value"]}`}>{details.salary}</div>
//                             </div>
//                             <div className={styles["detail-group"]}>
//                                 <span className={styles["detail-label"]}>Designation</span>
//                                 <div className={`col ${styles["detail-value"]}`}>{details.designation}</div>
//                             </div>
//                             <div className={styles["detail-group"]}>
//                                 <span className={styles["detail-label"]}>Email</span>
//                                 <div className={`col ${styles["detail-value"]}`}>{details.email_id}</div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             ) : (
//                 <p>Details Loading</p>
//             )}
//         </div>
//     );
// }

// export default EmpDetails;

import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Table } from "react-bootstrap";
import styles from '../css/EmpDetails.module.css'; 

function EmpDetails() {
    const [details, setDetails] = useState({});
    const name = useRef();
    const salary = useRef();
    const email_id = useRef();
    const designation = useRef();
    const team_code = useRef();
    const { _id } = useParams();
    const [showUpdateModal, setShowUpdateModal] = useState(false); 
    const [showCreateTeamModal, setShowCreateTeamModal] = useState(false); 
    const handleCloseUpdateModal = () => setShowUpdateModal(false);
    const handleCloseCreateTeamModal = () => setShowCreateTeamModal(false);
    const handleShowUpdateModal = () => setShowUpdateModal(true);
    const handleShowCreateTeamModal = () => setShowCreateTeamModal(true);
    const navigate = useNavigate();
    const [employee, setEmployee] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const tableRef = useRef(null);

    const handleRowClick = (id) => {
        setSelectedRows((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((item) => item !== id)
                : [...prevSelected, id]
        );
    };

    useEffect(() => {
        fetch(`http://localhost:8000/displayemployees/${_id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to show data");
                }
                return response.json();
            })
            .then((data) => {
                setDetails(data[0]);
            })
            .catch(error => console.error("Error fetching employee details:", error));
    }, [_id]);

    const saveChange = () => {
        const updatedValues = {
            "_id": _id,
            "name": name.current.value,
            "designation": designation.current.value,
            "email_id": email_id.current.value,
            "salary": parseFloat(salary.current.value),
        };

        fetch(`http://localhost:8000/admin_update?employee_id=${_id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: "PUT",
            body: JSON.stringify(updatedValues),
        })
        .then((response) => {
            if (response.ok) {
                alert("Employee details updated successfully!");
                handleCloseUpdateModal();
                // Optionally, re-fetch details to update the displayed info
                fetch(`http://localhost:8000/displayemployees/${_id}`)
                    .then(res => res.json())
                    .then(data => setDetails(data[0]));
            } else {
                console.error("Failed to update data");
                alert("Failed to update employee details.");
            }
        })
        .catch(error => console.error("Error updating employee:", error));
    };

    // Delete Employee
    const deletedata = () => {
        if (!window.confirm("Are you sure you want to delete this employee? This action cannot be undone.")) {
            return; // User cancelled
        }

        fetch(`http://localhost:8000/UIdelete?employee_id=${_id}`, {
            method: "PUT", // Assuming PUT is used for soft delete or status change
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to remove data");
            }
            alert("Employee deleted successfully!");
            navigate("/"); // Navigate back to home/employee list
        })
        .catch(error => {
            console.error("Error deleting employee:", error);
            alert("Failed to delete employee: " + error.message);
        });
    };

    // Fetch all employees for team creation
    useEffect(() => {
        fetch("http://localhost:8000/showallEmployee")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                return response.json();
            })
            .then((data) => {
                // Filter out the current employee from the list of potential team members
                setEmployee(data.filter(emp => emp._id !== _id));
            })
            .catch(error => console.error("Error fetching all employees:", error));
    }, [_id]); // Re-fetch if current employee ID changes

    // Submit Team
    const submitTeam = () => {
        if (!team_code.current.value) {
            alert("Please enter a Team Code.");
            return;
        }
        if (selectedRows.length === 0) {
            alert("Please select at least one team member.");
            return;
        }

        let detail = {
            "leader_id": details._id,
            "team_code": team_code.current.value,
            "members": {
                "mem1": selectedRows[0] || null,
                "mem2": selectedRows[1] || null,
                "mem3": selectedRows[2] || null,
                "mem4": selectedRows[3] || null,
            },
        };

        fetch(`http://localhost:8000/addteam`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(detail),
        })
        .then((response) => {
            if (response.ok) {
                alert("Team created successfully!");
                handleCloseCreateTeamModal();
                navigate("/"); // Navigate back to home/employee list
            } else {
                console.error("Failed to add team");
                alert("Failed to create team. Please try again.");
            }
        })
        .catch(error => console.error("Error creating team:", error));
    };

    return (
        <div className={styles["employee-details-wrapper"]}>
            <div className={styles["employee-details-container"]}>
                <div className={styles["header-section"]}>
                    <h1 className={styles["main-title"]}>Employee Profile</h1>
                    <div className={styles["action-buttons"]}>
                        <button className={styles["action-btn"]} onClick={handleShowUpdateModal}>Update Details</button>
                        <button className={styles["action-btn-danger"]} onClick={deletedata}>Delete Employee</button>
                        <button className={styles["action-btn"]} onClick={handleShowCreateTeamModal}>Create Team</button>
                    </div>
                </div>

                {details && Object.keys(details).length > 0 ? (
                    <div className={styles["details-card"]}>
                        <h2 className={styles["card-title"]}>Personal Information</h2>
                        <div className={styles["info-grid"]}>
                            <div className={styles["info-group"]}>
                                <span className={styles["info-label"]}>Full Name</span>
                                <div className={styles["info-value"]}>{details.name}</div>
                            </div>
                            <div className={styles["info-group"]}>
                                <span className={styles["info-label"]}>Username</span>
                                <div className={styles["info-value"]}>{details.username}</div>
                            </div>
                            <div className={styles["info-group"]}>
                                <span className={styles["info-label"]}>Password</span>
                                <div className={styles["info-value"]}>{details.password}</div>
                            </div>
                            <div className={styles["info-group"]}>
                                <span className={styles["info-label"]}>Designation</span>
                                <div className={styles["info-value"]}>{details.designation}</div>
                            </div>
                            <div className={styles["info-group"]}>
                                <span className={styles["info-label"]}>Email</span>
                                <div className={styles["info-value"]}>{details.email_id}</div>
                            </div>
                            <div className={styles["info-group"]}>
                                <span className={styles["info-label"]}>Salary</span>
                                <div className={styles["info-value"]}>${details.salary ? details.salary.toLocaleString() : 'N/A'}</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={styles["loading-message"]}>
                        <div className={styles["spinner"]}></div>
                        <p>Loading employee details...</p>
                    </div>
                )}
            </div>

            {/* Create Team Modal */}
            <Modal show={showCreateTeamModal} onHide={handleCloseCreateTeamModal} centered dialogClassName={styles["custom-modal"]}>
                <Modal.Header closeButton className={styles["modal-header"]}>
                    <Modal.Title className={styles["modal-title"]}>Create New Team</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles["modal-body"]}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className={styles["form-label"]}>Team Leader ID</Form.Label>
                            <div className={styles["form-static-value"]}>{details._id}</div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className={styles["form-label"]}>Team Code</Form.Label>
                            <Form.Control type="text" ref={team_code} autoFocus className={styles["form-control"]} placeholder="e.g., ALPHA-SQUAD" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className={styles["form-label"]}>Select Team Members (Max 4)</Form.Label>
                            <div className={styles["members-table-container"]}>
                                <Table striped bordered hover ref={tableRef} className={styles["members-table"]}>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Designation</th>
                                            <th>Email ID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employee.length > 0 ? (
                                            employee.map((data) => (
                                                <tr
                                                    key={data._id}
                                                    onClick={() => handleRowClick(data._id)}
                                                    className={`${styles["table-row"]} ${selectedRows.includes(data._id) ? styles["table-row-selected"] : ''}`}
                                                >
                                                    <td>{data.name}</td>
                                                    <td>{data.designation}</td>
                                                    <td>{data.email_id}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="text-center">No other employees available.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                            {selectedRows.length > 0 && (
                                <div className={styles["selected-members-count"]}>
                                    Selected: {selectedRows.length} / 4
                                </div>
                            )}
                        </Form.Group>
                        <Button onClick={submitTeam} className={styles["modal-submit-btn"]}>Create Team</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer className={styles["modal-footer"]}>
                    <Button variant="secondary" onClick={handleCloseCreateTeamModal} className={styles["modal-cancel-btn"]}>Close</Button>
                </Modal.Footer>
            </Modal>

            {/* Update Details Modal */}
            <Modal show={showUpdateModal} onHide={handleCloseUpdateModal} centered dialogClassName={styles["custom-modal"]}>
                <Modal.Header closeButton className={styles["modal-header"]}>
                    <Modal.Title className={styles["modal-title"]}>Update Employee Details</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles["modal-body"]}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className={styles["form-label"]}>Name</Form.Label>
                            <Form.Control type="text" defaultValue={details?.name || ""} ref={name} autoFocus className={styles["form-control"]} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className={styles["form-label"]}>Designation</Form.Label>
                            <Form.Control type="text" defaultValue={details?.designation || ""} ref={designation} className={styles["form-control"]} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className={styles["form-label"]}>Email</Form.Label>
                            <Form.Control type="text" defaultValue={details?.email_id || ""} ref={email_id} className={styles["form-control"]} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className={styles["form-label"]}>Salary</Form.Label>
                            <Form.Control type="number" defaultValue={details?.salary || ""} ref={salary} className={styles["form-control"]} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className={styles["modal-footer"]}>
                    <Button variant="secondary" onClick={handleCloseUpdateModal} className={styles["modal-cancel-btn"]}>Cancel</Button>
                    <Button variant="primary" onClick={saveChange} className={styles["modal-submit-btn"]}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default EmpDetails;
