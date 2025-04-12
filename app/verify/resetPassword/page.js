"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { resetPassword } from "@/actions/prismaActions";
import { supabase } from "@/util/supabase";
import classes from "../../resetPassword/style.module.css"; // Reuse the styles

export default function VerifyResetPassword() {
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isResetComplete, setIsResetComplete] = useState(false); // New state for tracking completion

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    async function verifyToken() {
      if (!token) {
        setError("Invalid reset link. No token provided.");
        setVerifying(false);
        setIsTokenValid(false);
        setLoading(false);
        return;
      }

      try {
        // Verify the token with Supabase
        const { error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: "recovery",
        });

        if (error) {
          console.error("Token verification failed:", error);
          setError("Invalid or expired reset link. Please request a new one.");
          setVerifying(false);
          setIsTokenValid(false);
        } else {
          console.log("Token verification successful");
          setVerifying(false);
          setIsTokenValid(true); // Set token as valid
        }
      } catch (err) {
        console.error("Error during verification:", err);
        setError("Failed to verify reset link. Please try again.");
        setVerifying(false);
        setIsTokenValid(false);
      } finally {
        setLoading(false);
      }
    }

    verifyToken();
  }, [token]);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate passwords
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      // Update the password directly with Supabase using the token
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        console.error("Password reset error:", error);
        setError(
          error.message || "Failed to reset password. Please try again."
        );
      } else {
        setSuccess("Password reset successfully!");
        setIsResetComplete(true); // Mark reset as complete

        // Sign out any existing session
        await supabase.auth.signOut();
      }
    } catch (err) {
      console.error("Error resetting password:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const navigateToLogin = () => {
    router.push("/login");
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className={classes.formContainer}>
          <p className={classes.title}>Verifying Reset Link</p>
          <div className="flex justify-center p-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show error if verification failed or no token provided
  if (!isTokenValid) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className={classes.formContainer}>
          <p className={classes.title}>Reset Password</p>
          <div className="p-6 text-center">
            <div className="text-red-500 mb-4">{error}</div>
            <p className="mb-4">Please request a new password reset link.</p>
            <Link
              href="/resetPassword"
              className="text-purple-400 hover:text-purple-300"
            >
              Request a new password reset
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show success screen after password reset
  if (isResetComplete) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className={classes.formContainer}>
          <p className={classes.title}>Password Reset Complete</p>
          <div className="p-6 text-center">
            <div className="text-green-500 text-xl mb-6">✓ {success}</div>
            <p className="mb-4">
              Your password has been successfully updated. You can now log in
              with your new password.
            </p>
            <button
              onClick={navigateToLogin}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show password reset form after successful verification
  return (
    <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
      <div className="flex items-center justify-center min-h-screen">
        <div className={classes.formContainer}>
          <p className={classes.title}>Reset Password</p>

          <form className={classes.form} onSubmit={handlePasswordReset}>
            <div className={classes.inputGroup}>
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <div className={classes.inputGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="m-[14px] text-red-500">{error}</div>}

            <button className={classes.sign} type="submit" disabled={loading}>
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-50"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Updating...
                </div>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-purple-400 hover:text-purple-300"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
