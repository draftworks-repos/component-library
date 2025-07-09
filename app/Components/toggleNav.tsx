"use client";
import { useState } from "react";
import styles from "./toggleNav.module.css";

type ToggleNavProps = {
  userType?: "user" | "admin" | "backoffice";
  mainOptions?: string[];
};

export default function ToggleNav({
  userType = "user",
  mainOptions = [
    "Startup",
    "Trademark",
    "Registration",
    "Gst",
    "MCA",
    "Compliance",
    "Income Tax",
    "About Us",
  ],
}: ToggleNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<"main" | number>("main");

  // Define options based on user type
  const getMenuOptions = () => {
    switch (userType) {
      case "admin":
        return [
          "Add New Back Office Executive/User",
          "Inactive (Manage) Users Back Office/User",
          "User Management",
          "System Settings",
          "Reports & Analytics",
          "Audit Logs"
        ];
      case "backoffice":
        return [
          "View Leads",
          "Lead Management",
          "Client Communication",
          "Document Processing",
          "Status Updates",
          "Reports"
        ];
      default:
        return mainOptions;
    }
  };

  const getSubOptions = (menuIndex: number) => {
    if (userType === "user") {
      return Array.from({ length: 18 }, (_, i) => `Sub Option ${i + 1}`);
    }
    
    if (userType === "admin") {
      switch (menuIndex) {
        case 0: // Add New Back Office Executive/User
          return [
            "Create Back Office Executive",
            "Create Regular User",
            "Set User Permissions",
            "Assign Roles",
            "Generate Access Credentials"
          ];
        case 1: // Inactive (Manage) Users
          return [
            "View Inactive Users",
            "Activate/Deactivate Users",
            "Reset User Passwords",
            "Modify User Roles",
            "Delete Users"
          ];
        case 2: // User Management
          return [
            "View All Users",
            "Edit User Profiles",
            "User Activity Logs",
            "Permission Management",
            "Bulk User Operations"
          ];
        default:
          return ["Feature Coming Soon"];
      }
    }
    
    if (userType === "backoffice") {
      switch (menuIndex) {
        case 0: // View Leads
          return [
            "All Leads",
            "New Leads",
            "Qualified Leads",
            "Hot Leads",
            "Cold Leads"
          ];
        case 1: // Lead Management
          return [
            "Assign Leads",
            "Update Lead Status",
            "Lead Follow-up",
            "Lead Conversion",
            "Lead Reports"
          ];
        default:
          return ["Feature Coming Soon"];
      }
    }
    
    return [];
  };

  const currentOptions = getMenuOptions();
  const isUserPanel = userType === "user";

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>MyLogo</div>
        <button
          className={styles.toggleButton}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </header>

      <div className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}>
        {activeMenu === "main" ? (
          <div className={styles.menu}>
            {userType !== "user" && (
              <div className={styles.panelHeader}>
                <h2 className={styles.panelTitle}>
                  {userType === "admin" ? "Admin Panel" : "Back Office Panel"}
                </h2>
              </div>
            )}
            <div className={styles.scrollWrapper}>
              <div className={styles.menuOptions}>
                {currentOptions
                  .slice(0, isUserPanel ? currentOptions.length - 1 : currentOptions.length)
                  .map((option, idx) => (
                    <div
                      key={idx}
                      className={styles.menuItem}
                      onClick={() => setActiveMenu(idx)}
                    >
                      {option}
                    </div>
                  ))}
                {isUserPanel && (
                  <div
                    className={styles.menuItem}
                    onClick={() => (window.location.href = "/about")}
                  >
                    {currentOptions[currentOptions.length - 1]}
                  </div>
                )}
              </div>
              <div className={styles.fadeTop} />
              <div className={styles.fadeBottom} />
            </div>
          </div>
        ) : (
          <div className={styles.subMenu}>
            <button
              className={styles.backButton}
              onClick={() => setActiveMenu("main")}
            >
              ← Back
            </button>
            <div className={styles.scrollWrapper}>
              <div className={styles.subOptions}>
                {getSubOptions(activeMenu as number).map((sub, idx) => (
                  <div key={idx} className={styles.subItem}>
                    {sub}
                  </div>
                ))}
              </div>
              <div className={styles.fadeTop} />
              <div className={styles.fadeBottom} />
            </div>
          </div>
        )}

        {userType === "user" ? (
          <button
            className={styles.contactButton}
            onClick={() => (window.location.href = "/contact")}
          >
            Contact Us
          </button>
        ) : (
          <div className={styles.userInfo}>
            <div className={styles.userStatus}>
              <span className={styles.statusDot}></span>
              <span>
                {userType === "admin" ? "Admin User" : "Back Office User"}
              </span>
            </div>
            <button
              className={styles.logoutButton}
              onClick={() => (window.location.href = "/logout")}
            >
              Logout
            </button>
          </div>
        )}

        {userType === "user" && (
          <div className={styles.socialIcons}>
            <div className={styles.socialIconsWrapper}>
              <a href="#" aria-label="LinkedIn">
                <img src="/whatsapp.svg" alt="LinkedIn" className={styles.icon} />
              </a>
              <a href="#" aria-label="LinkedIn">
                <img src="/linkedin.svg" alt="LinkedIn" className={styles.icon} />
              </a>
              <a href="#" aria-label="Instagram">
                <img
                  src="/instagram.svg"
                  alt="Instagram"
                  className={styles.icon}
                />
              </a>
              <a href="#" aria-label="Facebook">
                <img src="/facebook.svg" alt="Facebook" className={styles.icon} />
              </a>
              <a href="#" aria-label="Twitter">
                <img src="/twitter.svg" alt="Twitter" className={styles.icon} />
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
