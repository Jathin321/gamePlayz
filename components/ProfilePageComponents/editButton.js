"use client";
import { Edit } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAuthToken, getUserEmail } from "@/actions/auth";
import { getUserSlugByEmail } from "@/actions/prismaActions";
import { useState, useEffect } from "react";

function EditButton({ slug }) {
  const [token, setToken] = useState(null);
  const [currentUserSlug, setCurrentUserSlug] = useState("");

  useEffect(() => {
    async function fetchToken() {
      const fetchedToken = await getAuthToken();
      if (fetchedToken) {
        setToken(fetchedToken);
      } else {
        setToken(null);
      }
    }
    fetchToken();
  }, []);

  useEffect(() => {
    async function fetchEmailAndSlug() {
      if (token) {
        const { success, email, error } = await getUserEmail();
        if (success) {
          const fetchedSlug = await getUserSlugByEmail(email);
          setCurrentUserSlug(fetchedSlug);
        } else {
          console.error("Error fetching user email:", error);
          setCurrentUserSlug("No_User");
        }
      }
    }
    fetchEmailAndSlug();
  }, [token]);

  const path = usePathname();

  return (
    <>
      {currentUserSlug == slug ? (
        <Link
          href={`${path}/edit`}
          className="p-2 hover:bg-gray-700 rounded-full transition-colors"
        >
          <Edit className="w-4 h-4 text-gray-400" />
        </Link>
      ) : (
        ""
      )}
    </>
  );
}

export default EditButton;
