import Header from "@/components/HomePageComponents/header";

export default function ScrimsLayout({ children }) {
    return (
    <>
      <Header />
      <div className="mt-16">
      {children}
      </div>
      
    </>
    );
  }