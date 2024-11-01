import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || `http://localhost:3000`;

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/auth/sign-in`, data);
      if (!response.data) {
        throw new Error(`Error while sign-in user:`, response.status);
      }
      const { access_token } = response.data;
      localStorage.setItem(`token`, access_token);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          `Something went wrong, Please try again later.`
      );
      console.log(`Error:`, error.message);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.leftContent}></div>
      <div className={styles.loginBox}>
        <h2 className={styles.loginTitle}>Welcome Back!</h2>
        <p className={styles.loginSubtitle}>Please log in to your account</p>

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}

        <form
          className={styles.loginForm}
          autoComplete="true"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className={`${styles.input} ${
              errors.email ? styles.inputError : ""
            }`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}

          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className={`${styles.input} ${
              errors.password ? styles.inputError : ""
            }`}
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}

          <button type="submit" className={styles.loginButton}>
            Login
          </button>
          <p className={styles.signupLink}>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
