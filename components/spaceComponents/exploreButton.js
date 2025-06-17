"use client";

import { Search } from "lucide-react";

export default function ExploreButton() {
  const handleClick = () => {
    document.getElementById("explore-spaces")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-all border border-white/30 backdrop-blur-sm flex items-center justify-center gap-2"
    >
      <Search className="w-5 h-5" />
      Explore Spaces
    </button>
  );
}