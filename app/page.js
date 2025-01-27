import Image from "next/image";
import Header from "@/components/HomePageComponents/header";
import HeroSection from "@/components/HomePageComponents/heroSection";
import TournamentCard from "@/components/SharedComponents/tournamentCard";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />

      <div>
        <h2 className="text-3xl mt-12 ms-24 font-bold text-white text-left">
          Explore Tournaments
        </h2>

        <div className="lg:p-12 p-3 flex overflow-x-auto w-screen scrollbar-hidden">
          <TournamentCard />
          <TournamentCard />
          <TournamentCard />
          <TournamentCard />
          <TournamentCard />
          <TournamentCard />
        </div>
      </div>

      <div>
        <h2 className="text-3xl mt-12 ms-24 font-bold text-white text-left">
          Explore Spaces
        </h2>

        <div className="lg:p-12 p-3 flex overflow-x-auto w-screen scrollbar-hidden">
          <TournamentCard />
          <TournamentCard />
          <TournamentCard />
          <TournamentCard />
          <TournamentCard />
          <TournamentCard />
        </div>
      </div>

       <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Popular Spaces</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Join thriving tournament communities led by top organizers and brands
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* ESL Gaming Space */}
            <div className="bg-gray-800/50 rounded-2xl overflow-hidden backdrop-blur-sm hover:transform hover:scale-105 transition duration-300">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1561736778-92e52a7769ef?auto=format&fit=crop&w=800&q=80" 
                  alt="ESL Gaming" 
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-gray-900/90"></div>
                <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                  <img 
                    src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&q=80" 
                    alt="ESL Profile" 
                    className="w-16 h-16 rounded-full border-2 border-purple-500"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-bold text-white">ESL Gaming</h3>
                      {/* <Verified className="w-5 h-5 text-blue-400" /> */}
                    </div>
                    <p className="text-gray-300 text-sm">Official ESL Tournament Space</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-yellow-400">
                      {/* <Star className="w-5 h-5 mr-1" /> */}
                      <span>4.9</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      {/* <Users2 className="w-5 h-5 mr-1" /> */}
                      <span>250K</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {/* <Globe className="w-5 h-5 text-gray-300" /> */}
                    {/* <Youtube className="w-5 h-5 text-gray-300" /> */}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-700/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-white font-semibold">CS2 Pro League Season 5</h4>
                      <span className="text-green-400 text-sm">Live</span>
                    </div>
                    <p className="text-gray-400 text-sm">32 teams • $100,000 prize pool</p>
                  </div>
                  <div className="bg-gray-700/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-white font-semibold">Dota 2 Masters</h4>
                      <span className="text-yellow-400 text-sm">Upcoming</span>
                    </div>
                    <p className="text-gray-400 text-sm">16 teams • $50,000 prize pool</p>
                  </div>
                </div>

                <button className="w-full mt-6 bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition flex items-center justify-center space-x-2">
                  <span>Join Space</span>
                  {/* <ArrowRight className="w-4 h-4" /> */}
                </button>
              </div>
            </div>

            {/* FACEIT Space */}
            <div className="bg-gray-800/50 rounded-2xl overflow-hidden backdrop-blur-sm hover:transform hover:scale-105 transition duration-300">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=800&q=80" 
                  alt="FACEIT" 
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-gray-900/90"></div>
                <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                  <img 
                    src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=200&q=80" 
                    alt="FACEIT Profile" 
                    className="w-16 h-16 rounded-full border-2 border-purple-500"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-bold text-white">FACEIT</h3>
                      {/* <Verified className="w-5 h-5 text-blue-400" /> */}
                    </div>
                    <p className="text-gray-300 text-sm">Professional Tournament Platform</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-yellow-400">
                      {/* <Star className="w-5 h-5 mr-1" /> */}
                      <span>4.8</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      {/* <Users2 className="w-5 h-5 mr-1" /> */}
                      <span>180K</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {/* <Globe className="w-5 h-5 text-gray-300" /> */}
                    {/* <Youtube className="w-5 h-5 text-gray-300" /> */}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-700/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-white font-semibold">Valorant Pro Series</h4>
                      <span className="text-green-400 text-sm">Live</span>
                    </div>
                    <p className="text-gray-400 text-sm">24 teams • $75,000 prize pool</p>
                  </div>
                  <div className="bg-gray-700/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-white font-semibold">CS2 Community Cup</h4>
                      <span className="text-yellow-400 text-sm">Registering</span>
                    </div>
                    <p className="text-gray-400 text-sm">64 teams • $25,000 prize pool</p>
                  </div>
                </div>

                <button className="w-full mt-6 bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition flex items-center justify-center space-x-2">
                  <span>Join Space</span>
                  {/* <ArrowRight className="w-4 h-4" /> */}
                </button>
              </div>
            </div>

            {/* DreamHack Space */}
            <div className="bg-gray-800/50 rounded-2xl overflow-hidden backdrop-blur-sm hover:transform hover:scale-105 transition duration-300">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&w=800&q=80" 
                  alt="DreamHack" 
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-gray-900/90"></div>
                <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                  <img 
                    src="https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=200&q=80" 
                    alt="DreamHack Profile" 
                    className="w-16 h-16 rounded-full border-2 border-purple-500"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-bold text-white">DreamHack</h3>
                      {/* <Verified className="w-5 h-5 text-blue-400" /> */}
                    </div>
                    <p className="text-gray-300 text-sm">Gaming Festival Organizer</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    {/* <div className="flex items-center text-yellow-400"> */}
                      {/* <Star className="w-5 h-5 mr-1" /> */}
                      <span>4.7</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      {/* <Users2 className="w-5 h-5 mr-1" /> */}
                      <span>150K</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {/* <Globe className="w-5 h-5 text-gray-300" /> */}
                    {/* <Youtube className="w-5 h-5 text-gray-300" /> */}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-700/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-white font-semibold">DreamHack Open</h4>
                      <span className="text-green-400 text-sm">Live</span>
                    </div>
                    <p className="text-gray-400 text-sm">48 teams • $150,000 prize pool</p>
                  </div>
                  <div className="bg-gray-700/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-white font-semibold">Fortnite Masters</h4>
                      <span className="text-yellow-400 text-sm">Upcoming</span>
                    </div>
                    <p className="text-gray-400 text-sm">100 players • $40,000 prize pool</p>
                  </div>
                </div>

                <button className="w-full mt-6 bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition flex items-center justify-center space-x-2">
                  <span>Join Space</span>
                  {/* <ArrowRight className="w-4 h-4" /> */}
                </button>
              </div>
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
