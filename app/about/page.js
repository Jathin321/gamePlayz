import {
  Trophy,
  Gamepad,
  Users,
  Star,
  ArrowRight,
  ChevronRight,
  Zap,
  Calendar,
  Award,
  Globe,
  Target,
  Shield,
  MessageCircle,
  BarChart4,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Hero Section */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-purple-900 opacity-10 bg-[url('/esports-pattern.png')] bg-repeat bg-[length:500px_500px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Powering India's <span className="text-purple-400">Esports</span>{" "}
              Revolution
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              GamePlayz is India's premier esports ecosystem,
              connecting players, teams, tournament organizers, and communities
              to elevate gaming to its fullest potential.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/register"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-full transition-colors shadow-lg shadow-purple-600/20 font-medium"
              >
                Join GamePlayz
              </Link>
              <Link
                href="/tournaments"
                className="px-8 py-4 border border-gray-600 text-gray-300 hover:text-white rounded-full transition-colors hover:bg-gray-800/50"
              >
                Explore Tournaments
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block bg-purple-600/20 text-purple-400 text-sm font-semibold py-1 px-3 rounded-full mb-4">
              Our Mission
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Building the Future of{" "}
              <span className="text-purple-500">Indian Esports</span>
            </h2>
            <p className="text-lg text-gray-300">
              We're creating a comprehensive platform where gaming talent
              thrives, communities grow, and esports becomes accessible to
              everyone across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Esports Tournament"
                className="rounded-xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex-shrink-0 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    India-First Approach
                  </h3>
                  <p className="text-gray-300">
                    Built specifically for the Indian gaming community,
                    addressing unique challenges and opportunities in the
                    region's rapidly growing esports landscape.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex-shrink-0 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Accessible Competition
                  </h3>
                  <p className="text-gray-300">
                    Making competitive gaming accessible to players of all skill
                    levels, from beginners to professionals, through our
                    structured tournament system.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex-shrink-0 flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Community-Driven
                  </h3>
                  <p className="text-gray-300">
                    Empowering players to build their own gaming spaces, connect
                    with like-minded gamers, and grow the esports ecosystem from
                    the ground up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block bg-purple-600/20 text-purple-400 text-sm font-semibold py-1 px-3 rounded-full mb-4">
              Platform Features
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Everything You Need to{" "}
              <span className="text-purple-500">Compete</span>
            </h2>
            <p className="text-lg text-gray-300">
              GamePlayz offers a comprehensive toolset for organizing,
              participating, and growing in the esports world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group hover:shadow-xl hover:shadow-purple-600/10">
              <div className="w-14 h-14 bg-purple-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600/30 transition-colors">
                <Trophy className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Tournament Hosting
              </h3>
              <p className="text-gray-400 mb-6">
                Create and manage tournaments effortlessly with our intuitive
                tools. Set custom rules, brackets, and prize pools for any game.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                  <span className="text-gray-300">
                    Custom tournament formats
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                  <span className="text-gray-300">
                    Automatic bracket generation
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                  <span className="text-gray-300">
                    Real-time result updates
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group hover:shadow-xl hover:shadow-purple-600/10">
              <div className="w-14 h-14 bg-indigo-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600/30 transition-colors">
                <Gamepad className="w-7 h-7 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Scrim System
              </h3>
              <p className="text-gray-400 mb-6">
                Practice makes perfect. Find or create scrims to hone your
                skills against other teams in a competitive environment.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                  <span className="text-gray-300">Team matchmaking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                  <span className="text-gray-300">Flexible scheduling</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                  <span className="text-gray-300">Performance tracking</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group hover:shadow-xl hover:shadow-purple-600/10">
              <div className="w-14 h-14 bg-pink-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-pink-600/30 transition-colors">
                <Users className="w-7 h-7 text-pink-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Community Spaces
              </h3>
              <p className="text-gray-400 mb-6">
                Build your own gaming community with customizable spaces.
                Connect fans, players, and organizers in one centralized hub.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                  <span className="text-gray-300">Custom branding</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                  <span className="text-gray-300">Event management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                  <span className="text-gray-300">Member engagement tools</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group hover:shadow-xl hover:shadow-purple-600/10">
              <div className="w-14 h-14 bg-green-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-600/30 transition-colors">
                <BarChart4 className="w-7 h-7 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Player Profiles
              </h3>
              <p className="text-gray-400 mb-6">
                Showcase your gaming journey with detailed stats, achievements,
                and tournament history. Build your reputation in the Indian
                esports scene.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                  <span className="text-gray-300">Performance analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                  <span className="text-gray-300">Achievement showcase</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                  <span className="text-gray-300">
                    Team history and affiliations
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group hover:shadow-xl hover:shadow-purple-600/10">
              <div className="w-14 h-14 bg-amber-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-600/30 transition-colors">
                <MessageCircle className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Engagement Tools
              </h3>
              <p className="text-gray-400 mb-6">
                Connect and interact with players, teams and fans across India.
                Build relationships that help grow your esports presence.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                  <span className="text-gray-300">Community discussions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                  <span className="text-gray-300">Direct messaging</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                  <span className="text-gray-300">Event notifications</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Indian Esports Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block bg-purple-600/20 text-purple-400 text-sm font-semibold py-1 px-3 rounded-full mb-4">
              Indian Esports Ecosystem
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              The <span className="text-purple-500">Rising Power</span> in
              Global Esports
            </h2>
            <p className="text-lg text-gray-300">
              With over 400 million gamers and growing, India is rapidly
              becoming a major player in the global esports landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 text-center hover:transform hover:-translate-y-1 transition-all duration-300 hover:border-purple-500/30">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                400M+
              </div>
              <p className="text-gray-400">Indian Gamers</p>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 text-center hover:transform hover:-translate-y-1 transition-all duration-300 hover:border-purple-500/30">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                $1.5B
              </div>
              <p className="text-gray-400">Market Size by 2025</p>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 text-center hover:transform hover:-translate-y-1 transition-all duration-300 hover:border-purple-500/30">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                15%
              </div>
              <p className="text-gray-400">Annual Growth Rate</p>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 text-center hover:transform hover:-translate-y-1 transition-all duration-300 hover:border-purple-500/30">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                1000+
              </div>
              <p className="text-gray-400">Professional Teams</p>
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600 rounded-full filter blur-[120px] opacity-20 -z-10"></div>

            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Our Vision for Indian Esports
              </h3>
              <p className="text-gray-300 mb-6">
                At GamePlayz, we envision a future where Indian esports athletes
                compete on the global stage, where gaming is recognized as a
                legitimate career path, and where communities across the country
                can come together to celebrate the passion and skill of
                competitive gaming.
              </p>
              <p className="text-gray-300">
                By providing the tools, platform, and ecosystem needed to
                nurture talent, we aim to accelerate India's rise in the global
                esports arena and create opportunities for players, organizers,
                and communities throughout the country.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block bg-purple-600/20 text-purple-400 text-sm font-semibold py-1 px-3 rounded-full mb-4">
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Got <span className="text-purple-500">Questions?</span>
            </h2>
            <p className="text-lg text-gray-300">
              Find answers to the most common questions about GamePlayz and how
              it works.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-2">
                Is GamePlayz free to use?
              </h3>
              <p className="text-gray-300">
                Yes! GamePlayz is free to join and participate in most
                tournaments and scrims. We offer premium features and tools for
                tournament organizers and larger communities.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-2">
                What games are supported on the platform?
              </h3>
              <p className="text-gray-300">
                GamePlayz supports all major esports titles popular in India,
                including Free Fire, BGMI, Valorant, FIFA, Call of Duty Mobile,
                and many more. New games are added regularly based on community
                demand.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-2">
                How do I create my own tournament?
              </h3>
              <p className="text-gray-300">
                Creating a tournament is simple! Register an account, navigate
                to the Tournaments section, click "Create Tournament," and
                follow the step-by-step wizard to set up your event with custom
                rules, format, and registration options.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-2">
                Can I create a community for my team or organization?
              </h3>
              <p className="text-gray-300">
                Absolutely! GamePlayz Spaces allow you to create a dedicated
                community hub for your team, organization, or fan base. You can
                customize your space, manage members, host events, and engage
                with your community all in one place.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-2">
                How do scrims work on GamePlayz?
              </h3>
              <p className="text-gray-300">
                Scrims are practice matches between teams. You can either create
                a scrim by setting your preferred time, game, and team
                requirements, or browse available scrims to join. The platform
                handles matchmaking, scheduling, and result tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-purple-500/20 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600 rounded-full filter blur-[120px] opacity-20 -z-10"></div>

            <div className="max-w-3xl">
              <div className="inline-block bg-purple-600/20 text-purple-400 text-sm font-semibold py-1 px-3 rounded-full mb-4">
                Join the Revolution
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to level up your esports journey?
              </h2>

              <p className="text-lg text-gray-300 mb-8">
                Whether you're a player, team manager, tournament organizer, or
                esports enthusiast, GamePlayz has everything you need to thrive
                in India's growing esports ecosystem.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/register"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-full transition-colors shadow-lg shadow-purple-600/20 font-medium"
                >
                  Get Started for Free
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 border border-gray-600 text-gray-300 hover:text-white rounded-full transition-colors hover:bg-gray-800/50"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
