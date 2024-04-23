
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = (props) => {
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {email, password } = form;

    try {
      const response = await axios.post(
        `http://localhost:8800/api/login`,
        {  email, password }
      );
      const json = response.data;
      if (json.success) {
        localStorage.setItem("token", json.token);
        navigate("/dashboard");
      } else {
        alert("Login Error");
      }
    } catch (error) {
      console.error("Error in Login:", error);
      alert("Login Error");
    }
  };

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="h100  container register">
      <form className="col-6" onSubmit={handleSubmit}>
        <div>
          <div className=" text-primary my-4 text-center">
            <img src="startoon logo.png" className="register-img" />
          </div>
          <div className="text-dark my-4 text-center">
            <h5> Get into Your Account on Startoon </h5>
          </div>
        </div>
        
        <div className="form-group">
          <input
            type="email"
            className="form-control my-3"
            id="email"
            name="email"
            onChange={handleChange}
            aria-describedby="emailHelp"
            placeholder="Enter Email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control my-3"
            id="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            minLength={5}
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary btn-block my-3">
          Login
        </button>
        <div className="text-center">
          <p className="text-danger">
           Don't Have an Account ? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
