import {
  Gamepad2,
  Calendar,
  Users,
  Wallet,
  CalendarClock,
  Award,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";
import Link from "next/link";
import DOMPurify from "dompurify";

export default function ScrimDetailsComponent({ scrim }) {
  const sanitizedDescription = DOMPurify.sanitize(scrim.description);
  const FormatTime = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <>
      {/* Desktop view  */}
      <div className="hidden lg:block px-16 w-screen">
        <div className="bg-gray-900 text-white p-4 h-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
            {/* Scrim details  */}
            <div className="col-span-8 grid grid-cols-3 gap-8 px-12">
              <h2 className="col-span-3 text-xl font-bold mb-4">
                Scrim Details
              </h2>

              <div className="ms-3 mt-2 col-span-1 sm:col-span-5 lg:col-span-1 border rounded-lg border-[#9875ff] pt-2 p-3 bg-gray-900">
                <Gamepad2 className="w-10 h-10 text-[#9875ff] mb-2" />
                <h4 className="text-white text-lg mb-1">Game</h4>
                <p className="text-white text-sm">{scrim.game.name}</p>
              </div>

              <div className="ms-3 mt-2 col-span-1 sm:col-span-5 lg:col-span-1 border rounded-lg border-[#9875ff] pt-2 p-3 bg-gray-900">
                <Calendar className="w-10 h-10 text-[#9875ff] mb-2" />
                <h4 className="text-white text-lg mb-1">Schedule</h4>
                <p className="text-white text-sm">
                  {FormatTime(scrim.startDate)} - {FormatTime(scrim.endDate)}
                </p>
              </div>

              <div className="ms-3 mt-2 col-span-1 sm:col-span-5 lg:col-span-1 border rounded-lg border-[#9875ff] pt-2 p-3 bg-gray-900">
                <Users className="w-10 h-10 text-[#9875ff] mb-2" />
                <h4 className="text-white text-lg mb-1">Team Size</h4>
                <p className="text-white text-sm">{scrim.teamSize}</p>
              </div>

              <div className="ms-3 mt-2 col-span-1 sm:col-span-5 lg:col-span-1 border rounded-lg border-[#9875ff] pt-2 p-3 bg-gray-900">
                <CalendarClock className="w-10 h-10 text-[#9875ff] mb-2" />
                <h4 className="text-white text-lg mb-1">Slots</h4>
                <p className="text-white text-sm">{scrim.slots}</p>
              </div>

              <div className="ms-3 mt-2 col-span-1 sm:col-span-5 lg:col-span-1 border rounded-lg border-[#9875ff] pt-2 p-3 bg-gray-900">
                <Wallet className="w-10 h-10 text-[#9875ff] mb-2" />
                <h4 className="text-white text-lg mb-1">Entry Fee</h4>
                <p className="text-white text-sm">
                  ₹ {scrim.entryFee === 0 ? "Free" : scrim.entryFee}
                </p>{" "}
              </div>

              <div className="ms-3 mt-2 col-span-1 sm:col-span-5 lg:col-span-1 border rounded-lg border-[#9875ff] pt-2 p-3 bg-gray-900">
                <Award className="w-10 h-10 text-[#9875ff] mb-2" />
                <h4 className="text-white text-lg mb-1">Prize Pool</h4>
                <p className="text-white text-sm">₹ {scrim.prizePool}</p>
              </div>
            </div>

            {/* Admin Section  */}
            <div className="col-span-4 border-2 border-[#9875ff] rounded-lg p-4">
              <h1 className="text-center text-xl font-semibold mb-4">
                You are the admin
              </h1>
              <div className="flex flex-col space-y-4">
                {/* Current Status Section */}
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h2 className="text-lg font-medium text-[#9875ff] mb-2">
                    Current Status
                  </h2>
                  <p className="text-gray-400">
                    <span className="font-semibold">Scrim Status:</span>{" "}
                    {scrim.status}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-semibold">Matches Played:</span>{" "}
                    {scrim.matches.length}/{scrim.matchesCount}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-semibold">Next Match:</span> Match #
                    {scrim.matches.length + 1} at 3:00 PM
                  </p>
                </div>

                {/* Buttons Section */}
                <div className="flex flex-col space-y-4">
                  <Link
                    href={`/scrims/${scrim.slug}/control-panel`}
                    className="bg-[#9875ff] text-white text-center rounded-lg px-4 py-2 hover:bg-[#7c5cf7] transition-colors"
                  >
                    Open control panel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrim description  */}
        <div className="px-6 lg:px-12 mt-8">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Scrim Description
          </h2>
          <div className="mb-12 p-6 bg-gray-900 rounded-lg border border-purple-500 transition-all hover:shadow-lg">
            <div
              className="whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            />
          </div>
        </div>

        {/* Scrim rules  */}
        <div className="px-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
              <Info className="mr-3 w-8 h-8 text-purple-500" />
              Scrim Rules
            </h2>
          </div>

          <div className="mb-12 p-8 bg-gray-900 rounded-lg border-2 border-purple-500 transition-all hover:shadow-2xl hover:border-purple-400">
            <ul className="space-y-6 text-gray-200">
              {scrim.rules.map((rule, index) => (
                <li key={index} className="flex items-start space-x-4">
                  <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                  <span className="text-lg">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Host Info  */}
        <div className="mt-10 pb-24 px-12">
          <div className="mb-25">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Host info
            </h2>
          </div>

          <div className="p-6 bg-gray-900 rounded-lg border border-purple-500 transition-all hover:shadow-lg">
            <div className="flex">
              <img
                src={scrim.space.profilePic || "null"}
                alt="Host Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <h2 className="font-bold px-12 justify-center">
                {scrim.space.spaceName}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12">
            {/* Admin section  */}
            <div className="col-span-4 border-2 border-[#9875ff] rounded-lg p-4">
              <h1 className="text-center text-xl font-semibold mb-4">
                You are the admin
              </h1>
              <div className="flex flex-col space-y-4">
                {/* Current Status Section */}
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h2 className="text-lg font-medium text-[#9875ff] mb-2">
                    Current Status
                  </h2>
                  <p className="text-gray-400">
                    <span className="font-semibold">Scrim Status:</span>{" "}
                    {scrim.status}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-semibold">Matches Played:</span>{" "}
                    {scrim.matches.length}/{scrim.matchesCount}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-semibold">Next Match:</span> Match #
                    {scrim.matches.length + 1} at 3:00 PM
                  </p>
                </div>

                {/* Buttons Section */}
                <div className="flex flex-col space-y-4">
                  <Link
                    href={`/scrims/${scrim.slug}/control-panel`}
                    className="bg-[#9875ff] text-white text-center rounded-lg px-4 py-2 hover:bg-[#7c5cf7] transition-colors"
                  >
                    Open control panel
                  </Link>
                </div>
              </div>
            </div>

            {/* scrim details  */}
            <div className="col-span-8 grid grid-cols-3 gap-8">
              <h1 className="mt-3 col-span-3 text-2xl font-extrabold mb-4">
                Scrim Details
              </h1>

              <div className="col-span-1 sm:col-span-5 lg:col-span-1 border rounded-lg border-[#9875ff] pt-2 p-3 bg-gray-900">
                <Gamepad2 className="w-10 h-9 text-[#9875ff] mb-2" />
                <h4 className="text-white text-sm mb-1">Game</h4>
                <p className="text-white text-sm">{scrim.game.name}</p>
              </div>

              <div className="col-span-1 sm:col-span-5 lg:col-span-1 border rounded-lg border-[#9875ff] pt-2 p-3 bg-gray-900">
                <Calendar className="w-10 h-9 text-[#9875ff] mb-2" />
                <h4 className="text-white text-sm mb-1">Schedule</h4>
                <p className="text-white text-sm">
                  {FormatTime(scrim.startDate)} - {FormatTime(scrim.endDate)}
                </p>
              </div>

              <div className="col-span-1 sm:col-span-5 lg:col-span-1 border rounded-lg border-[#9875ff] pt-2 p-3 bg-gray-900">
                <Users className="w-10 h-9 text-[#9875ff] mb-2" />
                <h4 className="text-white text-sm mb-1">Team Size</h4>
                <p className="text-white text-sm">{scrim.teamSize}</p>
              </div>

              <div className="col-span-1 sm:col-span-5 lg:col-span-1 border rounded-lg border-[#9875ff] pt-2 p-3 bg-gray-900">
                <CalendarClock className="w-10 h-9 text-[#9875ff] mb-2" />
                <h4 className="text-white text-sm mb-1">Slots</h4>
                <p className="text-white text-sm">{scrim.slots}</p>
              </div>

              <div className="col-span-1 sm:col-span-5 lg:col-span-1 border rounded-lg border-[#9875ff] pt-2 p-3 bg-gray-900">
                <Wallet className="w-10 h-9 text-[#9875ff] mb-2" />
                <h4 className="text-white text-sm mb-1">Entry Fee</h4>
                <p className="text-white text-sm">
                  ₹ {scrim.entryFee === 0 ? "Free" : scrim.entryFee}
                </p>{" "}
              </div>

              <div className="col-span-1 sm:col-span-5 lg:col-span-1 border rounded-lg border-[#9875ff] pt-2 p-3 bg-gray-900">
                <Award className="w-10 h-9 text-[#9875ff] mb-2" />
                <h4 className="text-white text-sm mb-1">Prize Pool</h4>
                <p className="text-white text-sm">₹ {scrim.prizePool}</p>
              </div>
            </div>
          </div>
        </div>

        {/* scrim description  */}
        <div className="container mx-auto px-2 sm:px-6 lg:px-8 mt-8">
          <h1 className="text-2xl font-extrabold text-white mb-6">
            Scrim Description
          </h1>
          <div className="mb-12 p-6 bg-gray-900 rounded-lg border border-purple-500 transition-all hover:shadow-lg">
            <div
              className="whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            />
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
              {scrim.rules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
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

          <div className="p-6 bg-gray-900 rounded-lg border border-purple-500 transition-all hover:shadow-lg">
            <div className="flex">
              <img
                src={scrim.space.profilePic || "null"}
                alt="Host Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <h2 className="font-bold px-12 justify-center">
                {scrim.space.spaceName}
              </h2>
            </div>
            <button className="mx-20 p-2 text-xs mt-2 rounded-lg bg-purple-600">
              View Space
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
