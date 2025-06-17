import Header from "@/components/HomePageComponents/header";

export default function SpacesLayout({children})
{
    return(
        <>
            <Header/>
            {children}
        </>
    )
}