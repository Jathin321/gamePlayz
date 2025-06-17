import Header from "@/components/HomePageComponents/header";

export default function AboutLayout({ children }) {
    return (
    <>
      <Header />
      <div className="mt-16">
      {children}
      </div>
      
    </>
    );
  }