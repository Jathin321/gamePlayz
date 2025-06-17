"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { resetPassword } from "@/actions/prismaActions";
import { supabase } from "@/util/supabase";
import classes from "../../resetPassword/style.module.css"; // Reuse the styles

export default function VerifyResetPassword() {
  const [loading, setLoading] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isResetComplete, setIsResetComplete] = useState(false);
  const [token, setToken] = useState(null);

  const router = useRouter();

  // Fetch token only on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      setToken(searchParams.get("token"));
    }
  }, []);

  useEffect(() => {
    async function verifyToken() {
      if (!token) {
        setError("Invalid reset link. No token provided.");
        setIsTokenValid(false);
        setLoading(false);
        return;
      }

      try {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: "recovery",
        });

        if (error) {
          setError("Invalid or expired reset link. Please request a new one.");
          setIsTokenValid(false);
        } else {
          setIsTokenValid(true);
        }
      } catch {
        setError("Failed to verify reset link. Please try again.");
        setIsTokenValid(false);
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      verifyToken();
    }
  }, [token]);

  return <Suspense fallback={<div>Loading...</div>}>Your Component</Suspense>;
}
