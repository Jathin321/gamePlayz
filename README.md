# GamePlayz

GamePlayz is a modern web platform designed to manage, organize, and participate in esports tournaments. It serves as a bridge between esports tournament organizers and players, making it easy for organizers to host events and for players to discover, join, and compete in tournaments across various games.

---

## 🚀 Project Description

GamePlayz is built to streamline the esports ecosystem by providing a centralized hub for:

- **Tournament Organizers:** Effortlessly create, manage, and promote esports tournaments. Customize rules, track registrations, manage brackets, and communicate with participants.
- **Players:** Discover upcoming and live tournaments, register as individuals or teams, track your stats and achievements, and connect with the esports community.
- **Community:** GamePlayz acts as a middleman, connecting players and organizers, ensuring smooth operations, fair play, and a vibrant competitive environment.

---

## 🗂️ Project Structure

The project uses [Next.js](https://nextjs.org) (App Router) and is organized as follows:

```
gameplayz/
│
├── app/                        # Main Next.js app directory (routes, pages, layouts)
│   ├── tournaments/            # Tournament listing, details, creation, etc.
│   ├── profile/                # User profile pages and stats
│   ├── spaces/                 # Community spaces or teams
│   ├── settings/               # User dashboard settings
│   ├── verify/                 # Email/account verification
│   ├── ...                     # Other feature routes
│   └── page.js                 # Home page
│
├── components/                 # Reusable React components
│   ├── TournamentComponents/   # Tournament cards, lists, etc.
│   ├── ProfilePageComponents/  # Profile stats, charts, etc.
│   └── ...                     # Other UI components
│
├── actions/                    # Server actions (e.g., database queries, auth)
│   └── prismaActions.js
│
├── util/                       # Utility files (e.g., Prisma client, Supabase, helpers)
│   ├── prismaClient.js
│   └── supabase.js
│
├── prisma/                     # Prisma schema and migrations
│   └── schema.prisma
│
├── public/                     # Static assets (images, icons, etc.)
│
├── styles/                     # Global and component styles
│
├── package.json
├── README.md
└── ...
```

---

## 🏆 Key Features

- **Tournament Management:** Create, edit, and manage esports tournaments with customizable settings.
- **Player Registration:** Players can join tournaments as individuals or as part of a team.
- **Profile & Stats:** Track your performance, achievements, and match history.
- **Spaces & Teams:** Join or create teams/spaces for better collaboration and communication.
- **Settings:** Personalize your experience with theme, language, and notification preferences.
- **Authentication & Verification:** Secure sign-up, login, and email verification.
- **Charts & Visualizations:** Insightful graphs for player stats and tournament analytics.

---

## 🛠️ Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up your environment:**
   - Configure your database connection in `.env`
   - Run Prisma migrations:
     ```bash
     npx prisma migrate dev
     npx prisma generate
     ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma ORM](https://www.prisma.io/docs/)
- [React.js](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 📣 Contributing

Feedback and contributions are welcome! Please open an issue or submit a pull request.

---

## 📦 Deployment

The easiest way to deploy your Next.js app is with [Vercel](https://vercel.com/).

---

**GamePlayz** – Empowering esports communities, one tournament at a time!