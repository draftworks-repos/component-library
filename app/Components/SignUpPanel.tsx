"use client";
import { useState } from "react";
import styles from "./SignUpPanel.module.css";

type SignUpPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export default function SignUpPanel({ isOpen, onClose, onSuccess }: SignUpPanelProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"form" | "otp">("form");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleGetOTP = async () => {
    setMessage("");
    setIsLoading(true);

    // Basic validation
    if (!username.trim()) {
      setMessage("Username is required");
      setIsLoading(false);
      return;
    }

    if (!email.trim()) {
      setMessage("Email is required");
      setIsLoading(false);
      return;
    }

    if (!email.includes("@")) {
      setMessage("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setMessage("OTP sent to your email (mocked)");
      setStep("otp");
      setIsLoading(false);
    }, 1500);
  };

  const handleVerifyOTP = async () => {
    setMessage("");
    setIsLoading(true);

    if (!otp.trim()) {
      setMessage("OTP is required");
      setIsLoading(false);
      return;
    }

    if (otp.length < 4) {
      setMessage("Please enter a valid OTP");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setMessage("Account created successfully!");
      setIsLoading(false);
      
      // Call success callback after a short delay
      setTimeout(() => {
        onSuccess?.();
        handleReset();
        onClose();
      }, 2000);
    }, 1500);
  };

  const handleReset = () => {
    setUsername("");
    setEmail("");
    setOtp("");
    setStep("form");
    setMessage("");
    setIsLoading(false);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.popup}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {step === "form" ? "Create Account" : "Verify OTP"}
          </h2>
          <button className={styles.closeBtn} onClick={handleClose}>
            ✕
          </button>
        </div>

        <div className={styles.content}>
          {step === "form" ? (
            <>
              <div className={styles.inputGroup}>
                <label htmlFor="username" className={styles.label}>
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className={styles.input}
                  disabled={isLoading}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={styles.input}
                  disabled={isLoading}
                />
              </div>

              <button
                onClick={handleGetOTP}
                disabled={isLoading}
                className={`${styles.btn} ${styles.primaryBtn}`}
              >
                {isLoading ? "Sending OTP..." : "Get OTP"}
              </button>
            </>
          ) : (
            <>
              <div className={styles.otpInfo}>
                <p>We've sent a verification code to:</p>
                <strong>{email}</strong>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="otp" className={styles.label}>
                  Enter OTP
                </label>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 4-6 digit code"
                  className={`${styles.input} ${styles.otpInput}`}
                  disabled={isLoading}
                  maxLength={6}
                />
              </div>

              <div className={styles.buttonGroup}>
                <button
                  onClick={handleVerifyOTP}
                  disabled={isLoading}
                  className={`${styles.btn} ${styles.primaryBtn}`}
                >
                  {isLoading ? "Verifying..." : "Verify OTP & Register"}
                </button>

                <button
                  onClick={() => setStep("form")}
                  disabled={isLoading}
                  className={`${styles.btn} ${styles.secondaryBtn}`}
                >
                  Back to Form
                </button>
              </div>
            </>
          )}

          {message && (
            <div className={`${styles.message} ${
              message.includes("successfully") || message.includes("sent") 
                ? styles.successMessage 
                : styles.errorMessage
            }`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}