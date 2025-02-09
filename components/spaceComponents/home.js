import TournamentCard from "@/components/TournamentComponents/tournamentCard";
import ScrimsCard from "../ScrimComponents/scrimsCard";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-900 lg:px-12 px-4 mt-12 pb-24">
      <div className="flex py-3">
        <h1 className="font-bold text-2xl">Recent Tournaments</h1>
        <div className="ml-auto w-auto me-6">
          <Link href="#">
            <p className="border border-purple-300 px-2 py-2 rounded-lg items-center justify-center">
              <i className="fas fa-play mr-2" /> View More
            </p>
          </Link>
        </div>
      </div>
      {/* <div className="flex overflow-x-scroll w-full scrollbar-hidden px-4 py-6 gap-2">
        <TournamentCard />
        <TournamentCard />
        <TournamentCard />
        <TournamentCard />
      </div> */}

      <div className="w-full flex overflow-x-auto scrollbar-hidden gap-6">
        <TournamentCard />
        <TournamentCard />
        <TournamentCard />
        <TournamentCard />
        <TournamentCard />
        <TournamentCard />
      </div>

      <h1 className="px-5 py-3 font-bold text-2xl">Recent Scrims</h1>
      <div className="w-full flex overflow-x-auto  scrollbar-hidden gap-6">
        <ScrimsCard />
        <ScrimsCard />
        <ScrimsCard />
        <ScrimsCard />
        <ScrimsCard />
        <ScrimsCard />
      </div>

      <h1 className="px-5 py-3 font-extrabold">About</h1>
      <div className="container mx-auto px-4 py-6 border-2 border-solid border-violet-600 rounded-3xl flex">
        <div className="w-24 h-24 rounded-full bg-violet-500 justify-center items-center flex">
          hello
        </div>

        <div className="ml-5">
          <h1 className="font-bold text-lg">Space Owner Name</h1>
          <h1>Joined 2 months ago</h1>
          <button className="bg-violet-500 p-1 rounded-md">View Profile</button>
        </div>
      </div>
    </div>
  );
}
