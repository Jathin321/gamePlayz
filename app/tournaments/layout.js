import Header from "@/components/HomePageComponents/header";

export default function TournamentLayout({ children }) {
    return (
    <>
      <Header />
      <div className="mt-16">
      {children}
      </div>
      
    </>
    );
  }