import Head from "next/head";
import NavBar from "../project/NavBar";

interface MainLayoutProps {
    pageName: string;
    children: React.ReactNode;
    pageDescription: string;
}

const MainLayout = ({ children, pageName, pageDescription }: MainLayoutProps) => {
  return (
    <div>
        <Head>
            <title>{`${pageName} | WainerManager`}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />

            <meta name="author" content="Ivan Campos Wainer" />
            <meta name="description" content={`${pageDescription}`} />
        </Head>

        <div className="bg-gray-200 min-h-screen min-w-screen text-black">
            <NavBar />

            <main className="">{children}</main>
        </div>
    </div>
  )
}

export default MainLayout