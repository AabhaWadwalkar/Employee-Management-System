// import React, { useEffect, useRef, useState } from "react";
// import { NavLink, useNavigate, useParams } from "react-router-dom";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
// import styles from '../css/Graph.module.css';

// const Task_List = () => {
//   const [employeesWithTasks, setEmployeesWithTasks] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const postsPerPage = 5;
//   const [selectedMember, setSelectedMember] = useState(null);
//   const [display, setDisplay] = useState(false);
//   const [details, setDetails] = useState({});
//   const designation = useRef();
//   const salary = useRef();
//   const {_id} = useParams();
//   const navigate = useNavigate();

//   const saveChange = () => {
//     if (!selectedMember) return;
//     const updatedValues = {
//         "designation": designation.current.value,
//         "salary": parseFloat(salary.current.value)
//     };

//     fetch(`http://localhost:8000/admin_update?employee_id=${selectedMember._id}`, {
//         headers: { 'Content-Type': 'application/json' },
//         method: "PUT",
//         body: JSON.stringify(updatedValues),
//     })
//     .then((response) => {
//         if (response.ok) {
//             navigate("/");
//         } else {
//             console.log("Failed to update data");
//         }
//     });
// };

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

//   useEffect(() => {
//     const fetchEmployeesWithCompletedTasks = async () => {
//       try {
//         const empRes = await fetch("http://localhost:8000/showallEmployee");
//         if (!empRes.ok) throw new Error("Failed to fetch employees");
//         const allEmployees = await empRes.json();

//         const results = await Promise.all(
//           allEmployees.map(async (emp) => {
//             const res = await fetch(`http://localhost:8000/completedtask?emp_id=${emp._id}`);
//             const data = await res.json();
//             return { ...emp, completedTaskCount: data.count };
//           })
//         );

//         const filtered = results.filter(emp => emp.completedTaskCount > 0);
//         setEmployeesWithTasks(filtered);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     fetchEmployeesWithCompletedTasks();
//   }, []);

//   const handleShow = (member) => {
//     setSelectedMember(member);
//     setDisplay(true);
// };
// const handleClose = () => setDisplay(false);

//   const lastPostIndex = currentPage * postsPerPage;
//   const firstPostIndex = lastPostIndex - postsPerPage;
//   const currentPosts = employeesWithTasks.slice(firstPostIndex, lastPostIndex);
//   const totalPages = Math.ceil(employeesWithTasks.length / postsPerPage);

//   return (
//     <div className={styles["dashboard-graph"]}>
//       <table className={`table table-striped ${styles["custom-table"]}`}>
//         <thead className={styles["thead"]}>
//           <tr className={styles["tr"]}>
//             <th className={styles["th"]}>Name</th>
//             <th className={styles["th"]}>Completed Tasks</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentPosts.map((data) => (
//             <tr key={data._id}>
//               <td>
//                 <NavLink
//                   // to={`/displayemployees/${data._id}`}
//                   onClick={() => handleShow(data)}
//                   className={`text-decoration-none text-white ${styles["TD"]}`}
//                 >
//                   {data.name}
//                 </NavLink>
//               </td>
//               <td>
//                 <span>Tasks: {data.completedTaskCount}</span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <Modal show={display} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title style={{color: "black"}}>Promote {selectedMember?.name}</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form>
//                         <Form.Group className="mb-3">
//                             <Form.Label style={{color: "black"}}>Designation</Form.Label>
//                             <Form.Control type="text" defaultValue={details?.designation || ""} ref={designation} autoFocus />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label style={{color: "black"}}>Salary</Form.Label>
//                             <Form.Control type="number" defaultValue={details?.salary || ""} ref={salary} autoFocus/>
//                         </Form.Group>
//                         <Button onClick={saveChange}>Promote</Button>
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>Close</Button>
//                 </Modal.Footer>
//             </Modal>

//       <div className="d-flex justify-content-center">
//         <button
//           className={`btn btn-secondary ${styles["nav-button"]}`}
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//         >
//           Prev
//         </button>
//         <span className="align-self-center mx-2">Page {currentPage}</span>
//         <button
//           className={`btn btn-secondary ${styles["nav-button"]}`}
//           onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Task_List;
import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import styles from '../css/Graph.module.css';

const Task_List = () => {
  const [employeesWithTasks, setEmployeesWithTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const [selectedMember, setSelectedMember] = useState(null);
  const [display, setDisplay] = useState(false);
  const [details, setDetails] = useState({});
  const designation = useRef();
  const salary = useRef();
  const navigate = useNavigate();

  const saveChange = () => {
    if (!selectedMember) return;

    const updatedValues = {
      name: details.name,
      username: details.username,
      password: details.password,
      email_id: details.email_id,
      designation: designation.current.value,
      salary: parseInt(salary.current.value)
    };

    fetch(`http://localhost:8000/admin_update?employee_id=${selectedMember._id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: "PUT",
      body: JSON.stringify(updatedValues),
    })
      .then((response) => {
        if (response.ok) {
          setDisplay(false);
          navigate("/dashboard");
          // Optionally refresh list or show toast
        } else {
          console.log("Failed to update data");
        }
      })
      .catch((err) => {
        console.error("Request error:", err);
      });
  };

  const handleShow = async (member) => {
    setSelectedMember(member);
    try {
      const res = await fetch(`http://localhost:8000/displayemployees/${member._id}`);
      if (!res.ok) throw new Error("Failed to fetch employee details");
      const data = await res.json();
      setDetails(data[0]);
      setDisplay(true);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleClose = () => {
    setDisplay(false);
  };

  useEffect(() => {
    const fetchEmployeesWithCompletedTasks = async () => {
      try {
        const empRes = await fetch("http://localhost:8000/showallEmployee");
        if (!empRes.ok) throw new Error("Failed to fetch employees");
        const allEmployees = await empRes.json();

        const results = [];
        for (let emp of allEmployees) {
          const res = await fetch(`http://localhost:8000/completedtask?emp_id=${emp._id}`);
          const data = await res.json();
          if (data.count > 0) {
            results.push({ ...emp, completedTaskCount: data.count });
          }
        }

        setEmployeesWithTasks(results);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchEmployeesWithCompletedTasks();
  }, []);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = employeesWithTasks.slice(firstPostIndex, lastPostIndex);
  const totalPages = Math.ceil(employeesWithTasks.length / postsPerPage);

  return (
    <div className={styles["dashboard-graph"]}>
      <table className={`table table-striped ${styles["custom-table"]}`}>
        <thead className={styles["thead"]}>
          <tr className={styles["tr"]}>
            <th className={styles["th"]}>Name</th>
            <th className={styles["th"]}>Completed Tasks</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((data) => (
            <tr key={data._id}>
              <td>
                <span
                  onClick={() => handleShow(data)}
                  className={`text-decoration-none text-white ${styles["TD"]}`}
                  style={{ cursor: "pointer" }}
                >
                  {data.name}
                </span>
              </td>
              <td>
                <span>Tasks: {data.completedTaskCount}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={display} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}>
            Promote {selectedMember?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "black" }}>Designation</Form.Label>
              <Form.Control
                type="text"
                defaultValue={details?.designation || ""}
                ref={designation}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "black" }}>Salary</Form.Label>
              <Form.Control
                type="number"
                defaultValue={details?.salary || ""}
                ref={salary}
              />
            </Form.Group>
            <Button onClick={saveChange}>Promote</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="d-flex justify-content-center">
        <button
          className={`btn btn-secondary ${styles["nav-button"]}`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Prev
        </button>
        <span className="align-self-center mx-2">Page {currentPage}</span>
        <button
          className={`btn btn-secondary ${styles["nav-button"]}`}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Task_List;
