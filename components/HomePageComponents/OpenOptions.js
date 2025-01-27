'use client';
import { useState } from "react";
import Link from "next/link";

export default function OpenOptions() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-sticky"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
          aria-hidden="true"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
      
      <div
        className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
          isOpen ? "block" : "hidden"
        }`}
        id="navbar-sticky"
      >
        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <Link href="#">
              <div
                className="block py-2 px-3 text-white bg-[#A78BFA] rounded-sm md:bg-transparent md:text-[#A78BFA] md:p-0 md:dark:text-[#A78BFA]"
                aria-current="page"
              >
                Home
              </div>
            </Link>
          </li>
          <li>
            <Link href="#">
              <div className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#A78BFA] md:p-0 md:dark:hover:text-[#A78BFA] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                About
              </div>
            </Link>
          </li>
          <li>
            <Link href="#">
              <div className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#A78BFA] md:p-0 md:dark:hover:text-[#A78BFA] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Tournaments
              </div>
            </Link>
          </li>
          <li>
            <Link href="#">
              <div className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#A78BFA] md:p-0 md:dark:hover:text-[#A78BFA] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Spaces
              </div>
            </Link>
          </li>
          <li>
            <Link href="#">
              <div className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#A78BFA] md:p-0 md:dark:hover:text-[#A78BFA] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Contact
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
