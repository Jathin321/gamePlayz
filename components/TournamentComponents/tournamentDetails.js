import {
  Gamepad2,
  Calendar,
  Users,
  Wallet,
  CalendarClock,
  Award,
} from "lucide-react";

export default function TournamentDetailsComponent() {
  return (
    <>
      {/* Desktop view  */}
      <div className="hidden lg:block px-16 w-screen">
        <div className="bg-gray-900 text-white p-4 h-full">
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
            {/* Scrim details  */}
            <div className="col-span-8 grid grid-cols-3 gap-8 px-12">
              <h2 className="col-span-3 text-xl font-bold mb-4">
                Scrim Details
              </h2>

              <div className="ms-3 mt-2 col-span-1 sm:col-span-5 lg:col-span-1 border rounded-lg border-[#9875ff] pt-2 p-3 bg-gray-900">
                <Gamepad2 className="w-10 h-10 text-[#9875ff] mb-2" />
                <h4 className="text-white text-lg mb-1">Game</h4>
                <p className="text-white text-sm">Free Fire</p>
              </div>

              <div className="ms-3 mt-2 col-span-1 sm:col-span-5 lg:col-span-1 border rounded-lg border-[#9875ff] pt-2 p-3 bg-gray-900">
                <Calendar className="w-10 h-10 text-[#9875ff] mb-2" />
                <h4 className="text-white text-lg mb-1">Schedule</h4>
                <p className="text-white text-sm">Dec 1 - Dec 10</p>
              </div>

              <div className="ms-3 mt-2 col-span-1 sm:col-span-5 lg:col-span-1 border rounded-lg border-[#9875ff] pt-2 p-3 bg-gray-900">
                <Users className="w-10 h-10 text-[#9875ff] mb-2" />
                <h4 className="text-white text-lg mb-1">Team Size</h4>
                <p className="text-white text-sm">4</p>
              </div>

              <div className="ms-3 mt-2 col-span-1 sm:col-span-5 lg:col-span-1 border rounded-lg border-[#9875ff] pt-2 p-3 bg-gray-900">
                <CalendarClock className="w-10 h-10 text-[#9875ff] mb-2" />
                <h4 className="text-white text-lg mb-1">Slots</h4>
                <p className="text-white text-sm">32</p>
              </div>

              <div className="ms-3 mt-2 col-span-1 sm:col-span-5 lg:col-span-1 border rounded-lg border-[#9875ff] pt-2 p-3 bg-gray-900">
                <Wallet className="w-10 h-10 text-[#9875ff] mb-2" />
                <h4 className="text-white text-lg mb-1">Entry Fee</h4>
                <p className="text-white text-sm">₹ 200</p>
              </div>

              <div className="ms-3 mt-2 col-span-1 sm:col-span-5 lg:col-span-1 border rounded-lg border-[#9875ff] pt-2 p-3 bg-gray-900">
                <Award className="w-10 h-10 text-[#9875ff] mb-2" />
                <h4 className="text-white text-lg mb-1">Prize Pool</h4>
                <p className="text-white text-sm">₹ 10,000</p>
              </div>
            </div>

            <div className="col-span-4 border border-solid-2 border-[#9875ff] rounded-lg">
              <h1 className="text-center justify-center">Sponcers Section</h1>
            </div>
          </div>
        </div>

        {/* Scrim description  */}
        <div className="px-6 lg:px-12 mt-8">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Scrim Description
          </h2>
          <div className="mb-12 p-6 bg-gray-900 rounded-lg border border-purple-500 transition-all hover:shadow-lg">
            <p className="text-gray-200 leading-relaxed">
              🎮 Welcome to{" "}
              <span className="font-semibold text-purple-400">
                Nodwin Gaming's BGMI Community Cup
              </span>
              ! 🎉
              <br />
              <br />
              Assemble your squad and compete for your daily prize of{" "}
              <span className="font-bold text-yellow-400">1000 INR</span>! 💰
              <br />
              <br />
              🏆 <span className="font-bold text-green-400">
                1st Place:
              </span>{" "}
              700 INR
              <br />
              🥈 <span className="font-bold text-blue-400">2nd Place:</span> 200
              INR
              <br />
              🥉 <span className="font-bold text-red-400">3rd Place:</span> 100
              INR
              <br />
              <br />
              🗺️ <span className="font-bold text-indigo-400">Maps:</span>{" "}
              Miramar & Vikendi
            </p>
          </div>
        </div>

        {/* Scrim rules  */}
        <div className="px-12">
          <div className="mb-25">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Scrim Rules
            </h2>
          </div>

          <div className="mb-12 p-6 bg-gray-900 rounded-lg border border-purple-500 transition-all hover:shadow-lg">
            <ul className="space-y-4 text-gray-200">
              <li className="font-semibold text-purple-400">
                Game Specific Rules:
              </li>
              <li>
                <span className="font-bold text-yellow-400">1)</span> Platform -
                Mobile only.
              </li>
              <li>
                <span className="font-bold text-yellow-400">2)</span> Captain of
                the winning team must share scorecard screenshot to the admins.
              </li>
              <li>
                <span className="font-bold text-yellow-400">3)</span> Squad Name
                Tag Compulsory for all squad members.
              </li>
              <li>
                <span className="font-bold text-yellow-400">4)</span> Minimum
                Account Level: <span className="text-green-400">35</span>.
              </li>
              <li>
                <span className="font-bold text-yellow-400">5)</span> Minimum
                Tier: <span className="text-blue-400">Platinum</span>.
              </li>
              <li>
                <span className="font-bold text-yellow-400">6)</span> All 4
                players must have POV recorded with voice when asked. Failing
                which teams will be disqualified.
              </li>
              <li>
                <span className="font-bold text-yellow-400">7)</span>{" "}
                <span className="text-red-400">TABS & EMULATORS</span> are not
                allowed!
              </li>
              <li>
                <span className="font-bold text-yellow-400">8)</span> If a Team
                is Found With an Unregistered Player, Points will be considered
                as <span className="text-red-400">0</span>.
              </li>
              <li>
                <span className="font-bold text-yellow-400">9)</span>{" "}
                <span className="text-red-400">Solo and Duo</span> are not
                allowed.
              </li>
            </ul>
          </div>
        </div>

        {/* <div className="px-4 lg:px-8">
          <div className="mb-8">
            <h4 className="text-2xl font-bold text-white">Rules</h4>
          </div>

          <div className="p-6 border border-gray-700 rounded-lg bg-gray-900 hover:border-purple-500 transition-all hover:shadow-lg">
            <ul className="space-y-4 text-gray-200">
              <li className="font-semibold text-purple-400">
                Game Specific Rules:
              </li>
              <li>
                <span className="font-bold text-yellow-400">1)</span> Platform -
                Mobile only.
              </li>
              <li>
                <span className="font-bold text-yellow-400">2)</span> Captain of
                the winning team must share scorecard screenshot to the admins.
              </li>
              <li>
                <span className="font-bold text-yellow-400">3)</span> Squad Name
                Tag Compulsory for all squad members.
              </li>
              <li>
                <span className="font-bold text-yellow-400">4)</span> Minimum
                Account Level: <span className="text-green-400">35</span>.
              </li>
              <li>
                <span className="font-bold text-yellow-400">5)</span> Minimum
                Tier: <span className="text-blue-400">Platinum</span>.
              </li>
              <li>
                <span className="font-bold text-yellow-400">6)</span> All 4
                players must have POV recorded with voice when asked. Failing
                which teams will be disqualified.
              </li>
              <li>
                <span className="font-bold text-yellow-400">7)</span>{" "}
                <span className="text-red-400">TABS & EMULATORS</span> are not
                allowed!
              </li>
              <li>
                <span className="font-bold text-yellow-400">8)</span> If a Team
                is Found With an Unregistered Player, Points will be considered
                as <span className="text-red-400">0</span>.
              </li>
              <li>
                <span className="font-bold text-yellow-400">9)</span>{" "}
                <span className="text-red-400">Solo and Duo</span> are not
                allowed.
              </li>
            </ul>
          </div>
        </div> */}

        {/* Host Info  */}
        <div className="mt-10 pb-24 px-12">
          <div className="mb-25">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Host info
            </h2>
          </div>

          <div className=" p-6 bg-gray-900 rounded-lg border border-purple-500 transition-all hover:shadow-lg">
            <div className="flex">
              <img className="w-10 h-10 rounded-full object-cover" />
              <h2 className="font-bold px-12 justify-center">
                Host Space Name
              </h2>
            </div>
            <button className="mx-20 p-2 text-xs mt-2 rounded-lg bg-purple-600">
              View Space
            </button>
          </div>
        </div>
      </div>

      {/* Mobile view */}
      <div className="w-screen lg:hidden">
        <div className="bg-gray-900 text-white p-2 h-full">
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12">
            {/* scrim details  */}
            <div className="col-span-8 grid grid-cols-3 gap-8">
              <h1 className="mt-3 col-span-3 text-2xl font-extrabold mb-4">
                Scrim Details
              </h1>

              <div className="col-span-1 sm:col-span-5 lg:col-span-1 border rounded-lg border-[#9875ff] pt-2 p-3 bg-gray-900">
                <Gamepad2 className="w-10 h-9 text-[#9875ff] mb-2" />
                <h4 className="text-white text-sm mb-1">Game</h4>
                <p className="text-white text-sm">Free Fire</p>
              </div>

              <div className="col-span-1 sm:col-span-5 lg:col-span-1 border rounded-lg border-[#9875ff] pt-2 p-3 bg-gray-900">
                <Calendar className="w-10 h-9 text-[#9875ff] mb-2" />
                <h4 className="text-white text-sm mb-1">Schedule</h4>
                <p className="text-white text-sm">Dec 1 - Dec 10</p>
              </div>

              <div className="col-span-1 sm:col-span-5 lg:col-span-1 border rounded-lg border-[#9875ff] pt-2 p-3 bg-gray-900">
                <Users className="w-10 h-9 text-[#9875ff] mb-2" />
                <h4 className="text-white text-sm mb-1">Team Size</h4>
                <p className="text-white text-sm">4</p>
              </div>

              <div className="col-span-1 sm:col-span-5 lg:col-span-1 border rounded-lg border-[#9875ff] pt-2 p-3 bg-gray-900">
                <CalendarClock className="w-10 h-9 text-[#9875ff] mb-2" />
                <h4 className="text-white text-sm mb-1">Slots</h4>
                <p className="text-white text-sm">32</p>
              </div>

              <div className="col-span-1 sm:col-span-5 lg:col-span-1 border rounded-lg border-[#9875ff] pt-2 p-3 bg-gray-900">
                <Wallet className="w-10 h-9 text-[#9875ff] mb-2" />
                <h4 className="text-white text-sm mb-1">Entry Fee</h4>
                <p className="text-white text-sm">₹ 200</p>
              </div>

              <div className="col-span-1 sm:col-span-5 lg:col-span-1 border rounded-lg border-[#9875ff] pt-2 p-3 bg-gray-900">
                <Award className="w-10 h-9 text-[#9875ff] mb-2" />
                <h4 className="text-white text-sm mb-1">Prize Pool</h4>
                <p className="text-white text-sm">₹ 10,000</p>
              </div>
            </div>

            {/* sponcer section  */}
            <div className="col-span-4 border border-solid-2 border-[#9875ff] rounded-lg mt-6">
              <h1 className="text-center justify-center">Sponcers Section</h1>
            </div>
          </div>
        </div>

          {/* scrim description  */}
        <div className="container mx-auto px-2 sm:px-6 lg:px-8 mt-8">
          <h1 className="text-2xl font-extrabold text-white mb-6">
            Scrim Description
          </h1>
          <div className="mb-12 p-6 bg-gray-900 rounded-lg border border-purple-500 transition-all hover:shadow-lg">
            <p className="text-gray-200 leading-relaxed">
              🎮 Welcome to{" "}
              <span className="font-semibold text-purple-400">
                Nodwin Gaming's BGMI Community Cup
              </span>
              ! 🎉
              <br />
              <br />
              Assemble your squad and compete for your daily prize of{" "}
              <span className="font-bold text-yellow-400">1000 INR</span>! 💰
              <br />
              <br />
              🏆 <span className="font-bold text-green-400">
                1st Place:
              </span>{" "}
              700 INR
              <br />
              🥈 <span className="font-bold text-blue-400">2nd Place:</span> 200
              INR
              <br />
              🥉 <span className="font-bold text-red-400">3rd Place:</span> 100
              INR
              <br />
              <br />
              🗺️ <span className="font-bold text-indigo-400">Maps:</span>{" "}
              Miramar & Vikendi
            </p>
          </div>
        </div>

          {/* scrim rules  */}
        <div className="px-2">
          <div className="mb-25">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Scrim Rules
            </h2>
          </div>

          <div className="mb-12 p-6 bg-gray-900 rounded-lg border border-purple-500 transition-all hover:shadow-lg">
            <ul className="space-y-4 text-gray-200">
              <li className="font-semibold text-purple-400">
                Game Specific Rules:
              </li>
              <li>
                <span className="font-bold text-yellow-400">1)</span> Platform -
                Mobile only.
              </li>
              <li>
                <span className="font-bold text-yellow-400">2)</span> Captain of
                the winning team must share scorecard screenshot to the admins.
              </li>
              <li>
                <span className="font-bold text-yellow-400">3)</span> Squad Name
                Tag Compulsory for all squad members.
              </li>
              <li>
                <span className="font-bold text-yellow-400">4)</span> Minimum
                Account Level: <span className="text-green-400">35</span>.
              </li>
              <li>
                <span className="font-bold text-yellow-400">5)</span> Minimum
                Tier: <span className="text-blue-400">Platinum</span>.
              </li>
              <li>
                <span className="font-bold text-yellow-400">6)</span> All 4
                players must have POV recorded with voice when asked. Failing
                which teams will be disqualified.
              </li>
              <li>
                <span className="font-bold text-yellow-400">7)</span>{" "}
                <span className="text-red-400">TABS & EMULATORS</span> are not
                allowed!
              </li>
              <li>
                <span className="font-bold text-yellow-400">8)</span> If a Team
                is Found With an Unregistered Player, Points will be considered
                as <span className="text-red-400">0</span>.
              </li>
              <li>
                <span className="font-bold text-yellow-400">9)</span>{" "}
                <span className="text-red-400">Solo and Duo</span> are not
                allowed.
              </li>
            </ul>
          </div>
        </div>

          {/* Host Info  */}
        <div className="mt-10 pb-24 px-2">
          <div className="mb-25">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Host info
            </h2>
          </div>

          <div className=" p-6 bg-gray-900 rounded-lg border border-purple-500 transition-all hover:shadow-lg">
            <div className="flex">
              <img className="w-10 h-10 rounded-full object-cover" />
              <h2 className="font-bold px-12 justify-center">
                Host Space Name
              </h2>
            </div>
            <button className="mx-20 p-2 text-sm mt-2 rounded-lg bg-purple-600">
              View Space
            </button>
          </div>
        </div>

      </div>
    </>
  );
}
