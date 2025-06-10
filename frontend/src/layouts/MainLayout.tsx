import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/Navbar";

export default function MainLayout() {
    const location = useLocation();
    const hideNavOn = ["/signin", "/signup"];
    const shouldHideNav = hideNavOn.includes(location.pathname);

    return (
        <div className='min-h-screen flex flex-col'>
            {!shouldHideNav && <NavBar />}

            <main className='flex-1 mx-auto w-screen min-h-[calc(100vh-4rem)]'>
                <Outlet />
            </main>
        </div>
    );
}
