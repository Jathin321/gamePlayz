"use client";
import { useState } from "react";
import Link from "next/link";
import classes from "./style.module.css";
import {
  checkUserExists,
  sendPasswordResetOTP,
} from "@/actions/prismaActions";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      // Check if user exists
      const userExists = await checkUserExists("", email);

      if (!userExists.exists) {
        setError("No account found with this email address.");
        setLoading(false);
        return;
      }

      // Send reset link
      const response = await sendPasswordResetOTP(email);

      if (!response.success) {
        setError(
          response.error || "Failed to send reset link. Please try again."
        );
        setLoading(false);
        return;
      }

      setSuccess(
        "We've sent a password reset link to your email. Please check your inbox and click the link to reset your password."
      );
      setIsEmailSent(true); // Set this flag to true after successful email send
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className={classes.formContainer}>
        <p className={classes.title}>Reset Password</p>

        {isEmailSent ? (
          // Enhanced success state that matches your theme
          <div className={`${classes.form} flex flex-col items-center justify-center`}>
            <div className="w-full text-center mb-6">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center">
                  <svg className="h-8 w-8 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-300 mb-2">Email Sent</h3>
              <p className="text-gray-400">{success}</p>
            </div>
            
            <button 
              onClick={() => window.location.href = '/login'} 
              className={classes.sign}
            >
              Back to Login
            </button>
          </div>
        ) : (
          // Initial state or error state - show the form
          <form className={classes.form} onSubmit={handleEmailSubmit}>
            <div className={`${classes.inputGroup} pb-3`}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  Sending...
                </div>
              ) : (
                "Send Reset Link"
              )}
            </button>

            <div className="mt-6 text-center">
              <Link href="/login" className="text-purple-400 hover:text-purple-300">
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}