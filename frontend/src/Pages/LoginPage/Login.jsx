import React from "react";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2 className={styles.loginTitle}>Welcome Back!</h2>
        <p className={styles.loginSubtitle}>Please log in to your account</p>
        <form className={styles.loginForm}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className={styles.input}
            required
          />
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className={styles.input}
            required
          />
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
          <p className={styles.signupLink}>
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
