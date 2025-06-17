import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react"; // Import ArrowRight icon

export default function CreateCard({ title, description, icon: Icon, slug, context }) {
  const path = usePathname();
  var href;
  // console.log(context)
  if(context == "create-scrim") {
    href = `/spaces/${slug}/create-scrim`;
  }
  else{
    href = `/spaces/${slug}/create-tournament`;
  }
 
  return (
    <Link 
      href={href}
      className="group relative flex items-center gap-5 p-6 md:p-7 rounded-xl border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg hover:shadow-xl hover:shadow-purple-900/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      {/* Background gradient overlay that animates on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/0 via-purple-900/0 to-purple-900/0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
      
      {/* Icon container with animation */}
      <div className="relative flex-shrink-0">
        <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gray-700/50 border border-gray-600 group-hover:border-purple-500 group-hover:bg-gray-700 transition-all duration-300">
          <Icon className="w-6 h-6 md:w-8 md:h-8 text-purple-400 group-hover:text-purple-300 transition-transform duration-300 group-hover:scale-110" />
        </div>
      </div>
      
      {/* Content with better spacing */}
      <div className="flex-1 min-w-0">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-purple-200 transition-colors">
          {title}
        </h3>
        <p className="text-sm md:text-base text-gray-400 group-hover:text-gray-300 transition-colors">
          {description}
        </p>
      </div>
      
      {/* Arrow that animates on hover */}
      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 transition-all duration-300">
        <ArrowRight className="h-5 w-5 md:h-6 md:w-6 text-purple-400" />
      </div>
    </Link>
  );
}