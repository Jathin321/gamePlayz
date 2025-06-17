"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/util/supabase";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { createUser } from "@/actions/prismaActions";

export default function VerifyAccount() {
  const [status, setStatus] = useState("verifying");
  const [errorMessage, setErrorMessage] = useState("");
  const [tokenHash, setTokenHash] = useState(null);
  const router = useRouter();

  // Fetch token only on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      setTokenHash(searchParams.get("token_hash"));
    }
  }, []);

  useEffect(() => {
    async function handleVerification() {
      if (!tokenHash) {
        setStatus("error");
        setErrorMessage("No Token Found");
        return;
      }

      const type = "signup"; // Assuming verification type is signup
      console.log("Verifying with:", { tokenHash, type });

      const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });

      if (error) {
        console.log("OTP Verification Error:", error);
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
        if (!userData?.user) {
          setStatus("error");
          setErrorMessage("User not found after verification.");
          return;
        }

        const userProfile = {
          userId: userData.user.id,
          username: userData.user.email,
          email: userData.user.email,
          slug: userData.user.id,
        };

        const response = await createUser(userProfile);
        console.log("User creation response:", response);

        if (response.success) {
          setStatus("success");
        } else {
          setStatus("error");
          setErrorMessage("Verified, but User profile creation failed. Please contact support.");
        }
      } catch (err) {
        console.log("Error creating user:", err);
        setStatus("error");
        setErrorMessage("Verification successful, but unable to create profile.");
      }
    }

    if (tokenHash) {
      handleVerification();
    }
  }, [tokenHash]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {status === "verifying" ? (
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-white-500" />
          <p className="text-lg text-white">Verifying your account...</p>
        </div>
      ) : status === "success" ? (
        <div className="flex flex-col items-center p-6">
          <CheckCircle2 className="h-24 w-24 text-white" />
          <p className="text-2xl font-semibold text-white">Account verified successfully!</p>
          <Link href="/login" className="mt-6 px-6 py-3 bg-white text-violet-700 rounded-lg font-semibold hover:bg-violet-100">
            Login Now
          </Link>
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
