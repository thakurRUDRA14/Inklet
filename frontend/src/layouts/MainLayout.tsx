import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/Navbar";

export default function MainLayout() {
    const location = useLocation();
    const hideNavOn = ["/signin", "/signout"];
    const shouldHideNav = hideNavOn.includes(location.pathname);

    return (
        <>
            {!shouldHideNav && <NavBar />}
            <div className='min-h-screen dark:bg-black/90 py-8 px-4 sm:px-6 lg:px-8'>
                <Outlet />
            </div>
        </>
    );
}
