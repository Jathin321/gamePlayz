"use client";

import { useEffect, useState } from "react";
import { redirect, useSearchParams } from "next/navigation";
import { supabase } from "@/util/supabase";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { createUser } from "@/actions/prismaActions";

export default function VerifyAccount() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("verifying");
  const [errorMessage, setErrorMessage] = useState("");

  // Protecting the Route
  if (!searchParams.get("token_hash")) {
    redirect("/");
  }

  useEffect(() => {
    async function handleVerification() {
      const token_hash = searchParams.get("token_hash");
      const type = searchParams.get("type");
      const user_metadata = searchParams.get("data");
      const trimmed = user_metadata.replace(/^map\[/, "").replace(/\]$/, "");

      // Convert to a key-value object
      const parsedData = Object.fromEntries(
        trimmed.split(" ").map((pair) => {
          const [key, value] = pair.split(":");
          return [
            key,
            value === "false" ? false : value === "true" ? true : value,
          ];
        })
      );

      console.log("parsed Data : ", parsedData);

      if (!token_hash || !type) {
        setStatus("error");
        setErrorMessage("Invalid verification link.");
        return;
      }

      console.log("Verifying with:", { token_hash, type });

      const { error } = await supabase.auth.verifyOtp({ type, token_hash });

      if (error) {
        console.log("OTP Verification Error:", error);
        setStatus("error");

        if (error.code === "otp_expired") {
          setErrorMessage(
            "OTP has expired. Please request a new verification email."
          );
        } else if (error.code === "invalid_otp") {
          setErrorMessage(
            "Invalid OTP. Please check your email and try again."
          );
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

        const userProfile = {
          userId: userData.user.id, // Include userId in userProfile
          username: parsedData.username || userData.user.id,
          email: userData.user.email,
          slug: userData.user.id,
        };

        const response = await createUser(userProfile);
        console.log("response : ", response);

        if (response.success) {
          setStatus("success");
        } else {
          setStatus("error");
          setErrorMessage(
            "Verified but User profile creation failed. Please contact support."
          );
        }
      } catch (err) {
        console.log("Error creating user:", err);
        setStatus("error");
        setErrorMessage(
          "Verified but unable to create profile, please try again."
        );
      }
    }

    handleVerification();
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent p-4">
      {status === "verifying" ? (
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-white-500" />
          <p className="text-lg text-white">Verifying your account...</p>
        </div>
      ) : status === "success" ? (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
          <div className="flex flex-col items-center space-y-4 bg-purple-800 rounded-lg p-8 shadow-lg">
            <CheckCircle2 className="h-24 w-24 text-white" />
            <p className="text-2xl font-semibold text-white text-center">
              Account verified successfully!
            </p>
            <Link
              href="/login"
              className="mt-6 px-6 py-3 bg-white text-violet-700 rounded-lg font-semibold hover:bg-violet-100 transition duration-300"
            >
              Login Now
            </Link>
          </div>
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