import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Signup = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/auth/sign-up`, data);
      const { createdUser } = response.data;
      const { password: hashPassword, ...restUserDetails } = createdUser;

      setUser(restUserDetails);
      navigate("/login");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
      console.log(`Error:`, error.message);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.leftContent}></div>
      <div className={styles.formContainer}>
        <h2>Sign Up</h2>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="true">
          <div className={styles.inputContainer}>
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <p className={styles.error}>{errors.username.message}</p>
            )}
          </div>

          <div className={styles.inputContainer}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.inputContainer}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
          </div>

          <div className={styles.inputContainer}>
            <label>Age</label>
            <input
              type="number"
              placeholder="Enter your age"
              {...register("age", {
                required: "Age is required",
              })}
            />
            {errors.age && <p className={styles.error}>{errors.age.message}</p>}
          </div>

          <div className={styles.inputContainer}>
            <label>Gender</label>
            <select
              className={styles.genderDropdown}
              {...register("gender", { required: "Please select your gender" })}
            >
              <option value="">Select your gender</option>
              <option value="m">Male</option>
              <option value="f">Female</option>
              <option value="o">Other</option>
            </select>
            {errors.gender && (
              <p className={styles.error}>{errors.gender.message}</p>
            )}
          </div>

          <button type="submit" className={styles.signupButton}>
            Sign Up
          </button>
          <p className={styles.loginLink}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
