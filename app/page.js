import Image from "next/image";
import Header from "@/components/HomePageComponents/header";
import HeroSection from "@/components/HomePageComponents/heroSection";
import TournamentCard from "@/components/TournamentComponents/tournamentCard";
import SpaceCard from "@/components/HomePageComponents/homepageSpaceCard";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />

      {/* Hero Section */}
      <div className="mt-14 bg-gradient-to-r rounded-3xl p-8 md:p-12 text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Organize Your Esports Events
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Create and manage tournaments or scrims effortlessly. Bring your
          community together and elevate your gaming experience.
        </p>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Create Tournament Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex-1 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-semibold">Create a Tournament</h2>
            </div>
            <p className="text-gray-200 mb-6">
              Host competitive tournaments, invite players, and track progress
              with ease.
            </p>
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors duration-300">
              Get Started
            </button>
          </div>

          {/* Create Scrim Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex-1 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-semibold">Create a Scrim</h2>
            </div>
            <p className="text-gray-200 mb-6">
              Set up practice matches, invite teams, and improve your skills in
              a competitive environment.
            </p>
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg transition-colors duration-300">
              Get Started
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex items-center my-4 lg:px-32 px-4">
          <div className="">
            <h4 className="hf-section-title text-[25px] font-extrabold">
              Live Tournaments
            </h4>
          </div>

          <div className="ml-auto">
            <Link href="#">
              <p className="border border-purple-300 px-2 py-2 rounded-lg items-center justify-center">
                <i className="fas fa-play mr-2" /> View More
              </p>
            </Link>
          </div>
        </div>
        <div className="lg:p-12 p-3 flex overflow-x-auto w-screen scrollbar-hidden gap-5">
          <TournamentCard />
          <TournamentCard />
          <TournamentCard />
          <TournamentCard />
          <TournamentCard />
          <TournamentCard />
        </div>
      </div>

      <div>
        <div className="flex items-center my-4 lg:px-32 px-4">
          <div className="">
            <h4 className="hf-section-title text-[25px] font-extrabold">
              Popular Spaces
            </h4>
          </div>

          <div className="ml-auto">
            <Link href="#">
              <p className="border border-purple-300 px-2 py-2 rounded-lg items-center justify-center">
                <i className="fas fa-play mr-2" /> View More
              </p>
            </Link>
          </div>
        </div>
        <div className="px-5 flex overflow-x-scroll w-screen scrollbar-hidden">
          <SpaceCard />
          <SpaceCard />
          <SpaceCard />
          <SpaceCard />
          <SpaceCard />
          <SpaceCard />
        </div>
      </div>

      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li className="mb-2">
              Get started by editing{" "}
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                app/page.js
              </code>
              .
            </li>
            <li>Save and see your changes instantly.</li>
          </ol>

          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="dark:invert"
                src="/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              Deploy now
            </a>
            <a
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read our docs
            </a>
          </div>
        </main>

        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a>
        </footer>
      </div>
    </>
  );
}
