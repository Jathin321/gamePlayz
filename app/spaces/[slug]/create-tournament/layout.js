import Header from "@/components/HomePageComponents/header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}