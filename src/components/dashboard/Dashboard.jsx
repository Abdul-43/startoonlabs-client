import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [data, setData] = useState("");
  const [usertype, setUserType] = useState("");
  let navigate = useNavigate();

  const getuserdata = async ({ token }) => {
    try {
      let response = await axios.get(`http://localhost:8800/api/get`, {
        headers: {
          token,
        },
      });
      let details = response.data;
      console.log(details, "details");
      return details;
    } catch (error) {
      alert("try again later");
    }
  };

  const fetchdata = async () => {
    let token = localStorage.getItem("token");
    console.log("test", token);
    let details = await getuserdata({ token });
    console.log(details);
    if (details && details.message === "User data") {
      setUserType("user");
      setData(details.data);
    } else if (details && details.message === "All user data") {
      setUserType("admin");
      setData(details.data);
    }
  };
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchdata();
    }
  }, []);
  return (
    <div className="container my-5 text-center">
      {usertype == "user" && (
        <>
          <h1>Welcome to Dashboard</h1>
          <p>Name: {data.name}</p>
          <p>Email: {data.email}</p>
          <p>Gender: {data.gender}</p>
          <p>Last Login date: {data.lastLoginDate}</p>
        </>
      )}
      {usertype == "admin" && (
        <>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Gender</th>
                <th scope="col">Last Login Date</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item, index) => {
                  return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.gender}</td>
                      <td>{item.lastLoginDate}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Dashboard;
