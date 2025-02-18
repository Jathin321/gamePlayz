"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/util/supabase";
import { createUser } from "@/actions/userActions";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

export default function VerifyAccount() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState("verifying");
  const [errorMessage, setErrorMessage] = useState("");

  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  async function handleVerification() {
    if (!token_hash || !type) {
      setStatus("error");
      setErrorMessage("Invalid verification link.");
      return;
    }
    
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });

    if (error) {
      console.error("OTP Verification Error:", error);
      setStatus("error");

      if (error.code === "otp_expired") {
        setErrorMessage("OTP has expired. Please request a new verification email.");
      } else if (error.code === "invalid_otp") {
        setErrorMessage("Invalid OTP. Please check your email and try again.");
      } else {
        setErrorMessage("Verification failed. Please try again.");
      }
      return;
    }

    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        setStatus("error");
        setErrorMessage("User not found after verification.");
        return;
      }

      const response = await createUser({
        fullname: userData.user.user_metadata.fullname || "User",
        username: userData.user.user_metadata.username || userData.user.id,
        email: userData.user.email,
        slug: userData.user.id,
      });

      if (response.success) {
        setStatus("success");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setStatus("error");
        setErrorMessage("User profile creation failed. Please contact support.");
      }
    } catch (err) {
      console.error("Error creating user:", err);
      setStatus("error");
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  }

  handleVerification();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent p-4">
      {status === "verifying" ? (
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-white-500" />
          <p className="text-lg text-white">Verifying your account...</p>
        </div>
      ) : status === "success" ? (
        <div className="flex flex-col items-center space-y-4">
          <CheckCircle2 className="h-12 w-12 text-green-500" />
          <p className="text-lg text-white">✅ Account verified! Redirecting to login...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <XCircle className="h-12 w-12 text-red-500" />
          <p className="text-lg">❌ {errorMessage}</p>
        </div>
      )}
    </div>
  );
}
