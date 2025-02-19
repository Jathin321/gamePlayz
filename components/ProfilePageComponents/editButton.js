"use client";
import { Edit } from "lucide-react";
import { useAuth } from "@/context/authContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

function EditButton({email}) {
  const { user, logout } = useAuth();
  const path = usePathname()
  console.log("Edit Button Console : ",path)
  return (
    <>
      {user?.email == email ? (
        <Link href={`${path}/edit`} className="p-2 hover:bg-gray-700 rounded-full transition-colors">
          <Edit className="w-4 h-4 text-gray-400" />
        </Link>
      ) : (
        ""
      )}
    </>
  );
}

export default EditButton;
