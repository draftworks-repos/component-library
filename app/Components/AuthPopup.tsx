"use client";
import { useState } from "react";
import styles from "./AuthPopup.module.css";

type AuthPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AuthPopup({ isOpen, onClose }: AuthPopupProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSignIn = async () => {
    setError("");
    setIsLoading(true);
    
    // Basic email validation
    if (!email) {
      setError("Email is required");
      setIsLoading(false);
      return;
    }
    
    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setError("User does not exist");
      setIsLoading(false);
    }, 1000);
  };

  const handleSignUp = async () => {
    setError("");
    setIsLoading(true);
    
    if (!email) {
      setError("Email is required");
      setIsLoading(false);
      return;
    }
    
    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setError("Account created successfully!");
      setIsLoading(false);
    }, 1000);
  };

  const handleGoogleSignIn = () => {
    setError("");
    console.log("Continue with Google clicked");
    // Handle Google authentication
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.popup}>
        <div className={styles.header}>
          <h2 className={styles.title}>Welcome</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.content}>
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

          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          <div className={styles.buttonGroup}>
            <button
              onClick={handleSignIn}
              disabled={isLoading}
              className={`${styles.btn} ${styles.signInBtn}`}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            <button
              onClick={handleSignUp}
              disabled={isLoading}
              className={`${styles.btn} ${styles.signUpBtn}`}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>

            <div className={styles.divider}>
              <span>or</span>
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className={`${styles.btn} ${styles.googleBtn}`}
            >
              <svg className={styles.googleIcon} viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}