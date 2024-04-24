import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./ConfirmationPage.module.css";

const ConfirmationPage = () => {
  const location = useLocation();
  const { data } = location.state || {};

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Registration Successfull</h1>
      <div className={styles.imageContainer}>
        <img
          src="/confirmIcon.png"
          alt="confirmIcon"
          className={styles.confirmImage}
        />
      </div>
      {data ? (
        <div className={styles.info}>
          <p style={{color:"red"}}>
            <strong>Registration ID:</strong> <b>{data.registrationID}</b>
          </p>
          <p>
            <strong>Full Name:</strong> {data.addedUserInfo.userfullname}
          </p>
          <p>
            <strong>Email Address:</strong> {data.addedUserInfo.emailAddress}
          </p>
          <p>
            <strong>Phone Number:</strong> {data.addedUserInfo.phoneNumber}
          </p>
          <p>
            <strong>Gender:</strong> {data.addedUserInfo.gender}
          </p>
          <p>
            <strong>Address:</strong> {data.addedUserInfo.address}
          </p>
        </div>
      ) : (
        <p className={styles.noData}>No registration data available.</p>
      )}
    </div>
  );
};

export default ConfirmationPage;
