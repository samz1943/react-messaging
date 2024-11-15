import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";


function FullLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar></NavBar>
            <main className="flex-grow container mx-auto px-4 my-8">
                <Outlet/>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default FullLayout;