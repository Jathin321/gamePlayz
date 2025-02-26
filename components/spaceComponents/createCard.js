import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CreateCard({ title, description, icon: Icon, slug }) {
  const path = usePathname();
  return (
    <Link href={`${path}/${slug}`} className="flex flex-row h-auto w-full items-center justify-center p-6 border border-solid border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-transparent">
      <div className="flex items-center justify-center w-auto mr-4">
        <div className="lg:w-16 lg:h-16 w-12 h-12 border-2 border-dashed border-gray-400 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-700 transition-colors duration-300">
          <Icon className="w-6 h-6 sm:w-10 sm:h-10" />
        </div>
      </div>
      <div className="text-left">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-200">{title}</h1>
        <h3 className="text-sm sm:text-lg text-gray-400 mt-2">{description}</h3>
      </div>
    </Link>
  );
}