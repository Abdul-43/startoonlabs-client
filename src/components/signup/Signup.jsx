import React, { useState } from "react";
import { Link, useAsyncError, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import "./signup.css";

const Signup = (props) => {
  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, gender } = form;

    try {
      const response = await axios.post(
        `http://localhost:8800/api/signup`,
        { name, email, password, gender }
      );
      const json = response.data;
      console.log(json);
      if (json.success) {
        localStorage.setItem("token", json.token);
        navigate("/dashboard");
      } else {
        alert("SignUp Error");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("SignUp Error");
    }
  };

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  console.log(form)
  return (
    <div className="h100  container register">
      <form className="col-6" onSubmit={handleSubmit}>
        <div>
          <div className=" text-primary my-4 text-center">
            <img src="startoon logo.png" className="register-img" />
          </div>
          <div className="text-dark my-4 text-center">
            <h5> Creat Your Account on Startoon </h5>
          </div>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control my-3"
            id="name"
            name="name"
            onChange={handleChange}
            aria-describedby="emailHelp"
            placeholder="Enter Name"
            minLength={3}
            required
          />
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
        <div className="form-check d-flex align-items-center gap-2">
          <input
            type="radio"
            className="form-check-input my-3"
            name="gender"
            value="male"
            onChange={handleChange}
            required
            id="male"
          />
          <label className="form-check-label" for="male">
            Male
          </label>
        </div>
        <div className="form-check d-flex align-items-center gap-2">
          <input
            type="radio"
            className="form-check-input my-3"
            name="gender"
            value="female"
            onChange={handleChange}
            required
            id="female"
          />
          <label className="form-check-label" for="female">
            Female
          </label>
        </div>

        <button type="submit" className="btn btn-primary btn-block my-3">
          Submit
        </button>
        <div className="text-center">
          <p className="text-danger">
            Already a member ? <Link to="/">Log in</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
