"use client";
import { Edit } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAuthToken } from "@/actions/auth";
import { useState, useEffect } from "react";

function EditButton({ email }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState("");

  useEffect(() => {
    async function fetchToken() {
      const fetchedToken = await getAuthToken();
      if (fetchedToken) {
        // console.log("Token fetched:", fetchedToken);
        setToken(fetchedToken);
      } else {
        // console.log("No token found");
        setToken(null);
      }
    }
    fetchToken();
  }, []);

  useEffect(() => {
    if (token) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(storedUser);
      } else {
        console.log("No user forund in local Storage")
        setUser("No_User");
      }
    }
  }, [token]);

  const path = usePathname();
  // console.log("Edit Button Console : ", path);
  return (
    <>
      {user == email ? (
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
