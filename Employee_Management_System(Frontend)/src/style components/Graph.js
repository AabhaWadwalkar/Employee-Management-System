import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// import { actions } from "../store/store";
import styles from '../css/Graph.module.css';

const Graph = () => {
  const [employee, setEmployee] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;


  useEffect(() => {
    fetch("http://localhost:8000/showallEmployee")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setEmployee(data);
      });
  }, []);

  // const logout = () => {
  //   dispatch(actions.removeCredentials());
  //   localStorage.clear();
  //   navigate("/logout");
  // };

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = employee.slice(firstPostIndex, lastPostIndex);
  const totalPages = Math.ceil(employee.length / postsPerPage);

  return (
    <div className="row">
      <div className="col-md-12 col-sm-12">
        <div className={styles["dashboard-graph"]}>
          <div className={`row ${styles["x-title"]}`}>
            <div className="col-md-6">
              <h3>
                Employees 
              </h3>
            </div>
            <div className="col-md-6">
              <div className={styles["pull-right"]}>
                <i></i>
                <b className={styles["caret"]}></b>
              </div>
            </div>
          </div>

          <div className="d-flex">
            <div className="col-md-12 col-sm-12">
              <div className={styles["graph"]}>
                <table className={`table table-striped ${styles["custom-table"]}`}>
                  <thead className={styles["thead"]}>
                    <tr className={styles["tr"]}>
                      <th className={styles["th"]}>Name</th>
                      <th className={styles["th"]}>Username</th>
                      <th className={styles["th"]}>Password</th>
                      <th className={styles["th"]}>Designation</th>
                      <th className={styles["th"]}>Email ID</th>
                      <th className={styles["th"]}>Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPosts.map((data, index) => (
                      <tr key={index}>
                        <td>
                          <NavLink
                            to={`/displayemployees/${data._id}`}
                            className={`text-decoration-none text-white ${styles["TD"]}`}
                          >
                            {data.name}
                          </NavLink>
                        </td>
                        <td>
                          <NavLink
                            to={`/displayemployees/${data._id}`}
                            className={`text-decoration-none text-white ${styles["TD"]}`}
                          >
                            {data.username}
                          </NavLink>
                        </td>
                        <td>
                          <NavLink
                            to={`/displayemployees/${data._id}`}
                            className={`text-decoration-none text-white ${styles["TD"]}`}
                          >
                            {data.password}
                          </NavLink>
                        </td>
                        <td>
                          <NavLink
                            to={`/displayemployees/${data._id}`}
                            className={`text-decoration-none text-white ${styles["TD"]}`}
                          >
                            {data.designation}
                          </NavLink>
                        </td>
                        <td>
                          <NavLink
                            to={`/displayemployees/${data._id}`}
                            className={`text-decoration-none text-white ${styles["TD"]}`}
                          >
                            {data.email_id}
                          </NavLink>
                        </td>
                        <td>
                          <NavLink
                            to={`/displayemployees/${data._id}`}
                            className={`text-decoration-none text-white ${styles["TD"]}`}
                          >
                            {data.salary}
                          </NavLink>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graph;


