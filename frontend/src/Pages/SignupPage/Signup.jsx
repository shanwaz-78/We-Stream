import React from "react";
import styles from "./Signup.module.css";

const Signup = () => {
  return (
    <div className={styles.signupContainer}>
      <div className={styles.formContainer}>
        <h2>Sign Up</h2>
        <form>
          <div className={styles.inputContainer}>
            <label>Username</label>
            <input type="text" placeholder="Enter your username" required />
          </div>
          <div className={styles.inputContainer}>
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div className={styles.inputContainer}>
            <label>Password</label>
            <input type="password" placeholder="Create a password" required />
          </div>
          <button type="submit" className={styles.signupButton}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
