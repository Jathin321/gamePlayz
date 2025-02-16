import Image from "next/image";
import Link from "next/link";
import OpenOptions from "./OpenOptions";
import UserMenu from "./desktopUserMenu";

const Header = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image
              src="https://flowbite.com/docs/images/logo.svg"
              alt="Flowbite Logo"
              width={32}
              height={32}
              className="h-8"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              GamePlayz
            </span>
          </div>
        </Link>

        {/* Login Logout Profile  */}
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <UserMenu />
          {/* <Link href="/login" 
            className="text-white hover:bg-[#A78BFA] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-purple-900 dark:hover:bg-[#A78BFA]-700 dark:focus:ring-black"
          >
            Log In
          </Link> */}
        </div>

        <OpenOptions />
      </div>
    </nav>
  );
};

export default Header;
