"use client";
import { useState } from "react";
import EditProfilePanel from "./EditProfilePanel";
import styles from "./DashboardPanel.module.css";

type Task = {
  id: string;
  title: string;
  status: "Pending" | "In Progress" | "Completed";
  lastUpdated: string;
};

type DashboardPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  onLogout?: () => void;
};

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Complete project documentation",
    status: "In Progress",
    lastUpdated: "2 hours ago"
  },
  {
    id: "2",
    title: "Review client feedback",
    status: "Pending",
    lastUpdated: "1 day ago"
  },
  {
    id: "3",
    title: "Update website content",
    status: "Completed",
    lastUpdated: "3 days ago"
  },
  {
    id: "4",
    title: "Prepare monthly report",
    status: "Pending",
    lastUpdated: "5 hours ago"
  },
  {
    id: "5",
    title: "Team meeting preparation",
    status: "In Progress",
    lastUpdated: "1 hour ago"
  },
  {
    id: "6",
    title: "Database optimization",
    status: "Completed",
    lastUpdated: "1 week ago"
  }
];

export default function DashboardPanel({ isOpen, onClose, onLogout }: DashboardPanelProps) {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [userName] = useState("Kunal");
  const [userEmail] = useState("kunal@company.com");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  if (!isOpen) return null;

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "Completed":
        return "rgba(34, 197, 94, 1)"; // Green
      case "In Progress":
        return "rgba(59, 130, 246, 1)"; // Blue
      case "Pending":
        return "rgba(245, 158, 11, 1)"; // Orange
      default:
        return "#6b7280";
    }
  };

  const getStatusBgColor = (status: Task["status"]) => {
    switch (status) {
      case "Completed":
        return "rgba(34, 197, 94, 0.1)";
      case "In Progress":
        return "rgba(59, 130, 246, 0.1)";
      case "Pending":
        return "rgba(245, 158, 11, 0.1)";
      default:
        return "#f3f4f6";
    }
  };

  const handleLogout = () => {
    onLogout?.();
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
      onClose();
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={handleOverlayClick}>
        <div className={styles.dashboard}>
          <div className={styles.header}>
            <h1 className={styles.welcome}>Welcome, {userName}!</h1>
            <button className={styles.closeBtn} onClick={onClose}>
              ✕
            </button>
          </div>

          <div className={styles.content}>
            {/* Profile Section */}
            <div className={styles.profileSection}>
              <div className={styles.profileCard}>
                <div className={styles.profileHeader}>
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
                      userName.charAt(0).toUpperCase()
                    )}
                    <div className={styles.profileIconOverlay}>
                      ✏️
                    </div>
                  </div>
                  <div className={styles.profileInfo}>
                    <h3 className={styles.profileName}>{userName}</h3>
                    <p className={styles.profileEmail}>{userEmail}</p>
                  </div>
                </div>
                <button 
                  className={styles.editBtn}
                  onClick={() => setShowEditProfile(true)}
                >
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Work Status Section */}
            <div className={styles.workSection}>
              <h2 className={styles.sectionTitle}>Work Status</h2>
              <div className={styles.tasksGrid}>
                {mockTasks.map((task) => (
                  <div key={task.id} className={styles.taskCard}>
                    <div className={styles.taskHeader}>
                      <h4 className={styles.taskTitle}>{task.title}</h4>
                      <span 
                        className={styles.taskStatus}
                        style={{ 
                          color: getStatusColor(task.status),
                          backgroundColor: getStatusBgColor(task.status)
                        }}
                      >
                        {task.status}
                      </span>
                    </div>
                    <p className={styles.taskUpdated}>
                      Last updated: {task.lastUpdated}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className={styles.actions}>
              <button 
                className={styles.logoutBtn}
                onClick={handleLogout}
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <EditProfilePanel
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        currentName={userName}
        currentEmail={userEmail}
      />
    </>
  );
}