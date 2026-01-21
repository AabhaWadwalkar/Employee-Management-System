import React, { useEffect, useState } from "react";
import styles from "../css/DeletedDetails.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/store";

const DeletedDetails = () => {
  const [emp, setEmp] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/deletedemp")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to show deleted data");
        }
        return response.json();
      })
      .then((data) => {
        setEmp(data);
        console.log(data);
      });
  }, []);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = emp.slice(firstPostIndex, lastPostIndex);
  const totalPages = Math.ceil(emp.length / postsPerPage);

      const LOGOUT = ()=>{
          dispatch(logout());
          navigate('/logout');
      }

  return (
    <div>
      <div className={styles["deleted-container"]}>
        <div className={styles["page-header"]}>
          <div className={styles["deletetitle-sec"]}>
            <h1 className={styles["page-title"]}>Deleted Employees</h1>
            <p className={styles["page-subtitle"]}>
              View and manage deleted employee records
            </p>
            <button onClick={LOGOUT}>Logout</button>
          </div>
        </div>

        {/* <div className={styles["tabs"]}>
          <div className={styles["tab"]}>Deleted Employees</div> */}
          {/* <div className={styles["tab"]}>All Employees</div> */}
        {/* </div> */}

        <div className={styles["table-container"]}>
          <table className={styles["data-table"]}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Password</th>
                <th>Designation</th>
                <th>Email ID</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((data, index) => (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>{data.username}</td>
                  <td>{data.password}</td>
                  <td>{data.designation}</td>
                  <td>{data.email_id}</td>
                  <td>{data.salary}</td>
                  <td>
                    <span className={styles["status-badge"] + " " + styles["badge-danger"]}>
                      Deleted
                    </span>
                  </td>
                  <td>
                    <button
                      className={styles["action-btn"] + " " + styles["btn-restore"]}
                    >
                      Restore
                    </button>
                    <button
                      className={styles["action-btn"] + " " + styles["btn-permanent"]}
                    >
                      Delete Permanently
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles["pagination"]}>
          <button
            className={styles["pagination-btn"]}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <span className={styles["page-info"]}>Page {currentPage} of {totalPages}</span>
          <button
            className={styles["pagination-btn"]}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal (optional: you can conditionally render this) */}
      <div className="modal-overlay" id="deleteModal">
        <div className="modal">
          <button className="modal-close" id="closeDeleteModal">
            &times;
          </button>
          <div className="modal-header">
            <h2 className="modal-title">Confirm Permanent Deletion</h2>
          </div>
          <div className="modal-body">
            <p>
              Are you sure you want to permanently delete this employee record?
              This action cannot be undone and all associated data will be
              permanently removed from the system.
            </p>
          </div>
          <div className="modal-footer">
            <button className="action-btn btn-restore" id="cancelDeleteBtn">
              Cancel
            </button>
            <button className="action-btn btn-permanent">
              Delete Permanently
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletedDetails;
