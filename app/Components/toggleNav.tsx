"use client";
import { useState } from "react";
import styles from "./toggleNav.module.css";

type ToggleNavProps = {
  mainOptions?: string[];
};

export default function ToggleNav({
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

  const subOptions = Array.from(
    { length: 18 },
    (_, i) => `Sub Option ${i + 1}`
  );

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
            <div className={styles.scrollWrapper}>
              <div className={styles.menuOptions}>
                {mainOptions
                  .slice(0, mainOptions.length - 1)
                  .map((option, idx) => (
                    <div
                      key={idx}
                      className={styles.menuItem}
                      onClick={() => setActiveMenu(idx)}
                    >
                      {option}
                    </div>
                  ))}
                <div
                  className={styles.menuItem}
                  onClick={() => (window.location.href = "/about")}
                >
                  {mainOptions[mainOptions.length - 1]}
                </div>
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
                {subOptions.map((sub, idx) => (
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

        <button
          className={styles.contactButton}
          onClick={() => (window.location.href = "/contact")}
        >
          Contact Us
        </button>

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
      </div>
    </>
  );
}
