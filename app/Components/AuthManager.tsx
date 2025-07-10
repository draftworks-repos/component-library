"use client";
import { useState } from "react";
import AuthPopup from "./AuthPopup";
import SignUpPanel from "./SignUpPanel";
import DashboardPanel from "./DashboardPanel";

type PanelState = "auth" | "signup" | "dashboard";

type AuthManagerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AuthManager({ isOpen, onClose }: AuthManagerProps) {
  const [panelState, setPanelState] = useState<PanelState>("auth");

  if (!isOpen) return null;

  const handleAuthSignUp = () => {
    setPanelState("signup");
  };

  const handleAuthSignIn = () => {
    setPanelState("dashboard");
  };

  const handleAuthGoogleSignIn = () => {
    setPanelState("dashboard");
  };

  const handleSignUpSuccess = () => {
    setPanelState("dashboard");
  };

  const handleSignUpClose = () => {
    setPanelState("auth");
  };

  const handleDashboardLogout = () => {
    setPanelState("auth");
  };

  const handleDashboardClose = () => {
    onClose();
    // Reset to auth state for next time
    setPanelState("auth");
  };

  const handleAuthClose = () => {
    onClose();
    // Reset to auth state for next time
    setPanelState("auth");
  };

  return (
    <>
      {panelState === "auth" && (
        <AuthPopup
          isOpen={true}
          onClose={handleAuthClose}
          onSignUp={handleAuthSignUp}
          onSignIn={handleAuthSignIn}
          onGoogleSignIn={handleAuthGoogleSignIn}
        />
      )}

      {panelState === "signup" && (
        <SignUpPanel
          isOpen={true}
          onClose={handleSignUpClose}
          onSuccess={handleSignUpSuccess}
        />
      )}

      {panelState === "dashboard" && (
        <DashboardPanel
          isOpen={true}
          onClose={handleDashboardClose}
          onLogout={handleDashboardLogout}
        />
      )}
    </>
  );
}