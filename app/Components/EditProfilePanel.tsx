"use client";
import { useState } from "react";
import styles from "./EditProfilePanel.module.css";

type EditProfilePanelProps = {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  currentEmail: string;
};

export default function EditProfilePanel({ 
  isOpen, 
  onClose, 
  currentName, 
  currentEmail 
}: EditProfilePanelProps) {
  const [name, setName] = useState(currentName);
  const [email, setEmail] = useState(currentEmail);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = async () => {
    setMessage("");
    setIsLoading(true);

    // Basic validation
    if (!name.trim()) {
      setMessage("Name is required");
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
      setMessage("Changes saved successfully!");
      setIsLoading(false);
      
      // Close modal after success message
      setTimeout(() => {
        onClose();
        setMessage("");
      }, 2000);
    }, 1500);
  };

  const handleCancel = () => {
    // Reset to original values
    setName(currentName);
    setEmail(currentEmail);
    setMessage("");
    setProfileImage(null);
    onClose();
  };

  const handleProfileImageClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setProfileImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  const hasChanges = name !== currentName || email !== currentEmail;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Edit Profile</h2>
          <button className={styles.closeBtn} onClick={handleCancel}>
            ✕
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.profilePreview}>
            <div 
              className={styles.profileIcon}
              onClick={handleProfileImageClick}
            >
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    borderRadius: '50%', 
                    objectFit: 'cover' 
                  }} 
                />
              ) : (
                name.charAt(0).toUpperCase() || "U"
              )}
              <div className={styles.profileIconOverlay}>
                ✏️
              </div>
            </div>
            <p className={styles.previewText}>Profile Preview</p>
          </div>

          <div className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
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
                className={`${styles.input} ${styles.readOnlyInput}`}
                disabled={isLoading}
                readOnly
              />
              <p className={styles.inputHint}>
                Email cannot be changed for security reasons
              </p>
            </div>

            {message && (
              <div className={`${styles.message} ${
                message.includes("successfully") 
                  ? styles.successMessage 
                  : styles.errorMessage
              }`}>
                {message}
              </div>
            )}

            <div className={styles.buttonGroup}>
              <button
                onClick={handleSave}
                disabled={isLoading || !hasChanges}
                className={`${styles.btn} ${styles.saveBtn}`}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>

              <button
                onClick={handleCancel}
                disabled={isLoading}
                className={`${styles.btn} ${styles.cancelBtn}`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}