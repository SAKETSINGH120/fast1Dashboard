import React, { useState } from "react";
import styles from "./DeleteAccount.module.css";
import { baseUrl } from "../../Components/service/Api";

const DeleteAccount = () => {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validatePhone = (value) => /^[0-9]{10}$/.test(value);
  const validateOtp = (value) => /^[0-9]{4}$/.test(value);

  const sendOtp = async () => {
    if (!validatePhone(phone)) {
      return setError("Please enter a valid 10-digit phone number.");
    }
    console.log("check");
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${baseUrl}/newSubscriber/deleteSubscriber`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();

      console.log("data", data);

      if (data.status) {
        setStep("otp");
      } else {
        setError(data.message || "Failed to send OTP.");
      }
    } catch (err) {
      setError("Error sending OTP.");
      console.log("error", err);
    }
    setLoading(false);
  };

  const verifyOtpAndDelete = async () => {
    if (!validateOtp(otp)) {
      return setError("OTP must be a 4-digit number.");
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${baseUrl}/newSubscriber/verifyDeteleAccountOtp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone, otp }),
        }
      );

      const data = await res.json();

      if (data.status) {
        setStep("success");
      } else {
        setError(data.message || "Invalid OTP.");
      }
    } catch (err) {
      setError("Error verifying OTP.");
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      {step === "phone" && (
        <>
          <h1 className={styles.title}>Delete Account</h1>
          <input
            type="text"
            maxLength="10"
            placeholder="Enter 10-digit phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            className={styles.input}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button
            onClick={sendOtp}
            disabled={loading || !phone}
            className={styles.button}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </>
      )}

      {step === "otp" && (
        <>
          <h1 className={styles.title}>Verify OTP</h1>
          <input
            type="text"
            maxLength="4"
            placeholder="Enter 4-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            className={styles.input}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button
            onClick={verifyOtpAndDelete}
            disabled={loading || !otp}
            className={styles.button}
          >
            {loading ? "Verifying..." : "Delete Account"}
          </button>
        </>
      )}

      {step === "success" && (
        <div className={styles.success}>
          <h1>Account Deleted</h1>
          <p>Your account has been successfully deleted.</p>
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;
