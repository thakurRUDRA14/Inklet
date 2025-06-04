import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/Navbar";

export default function MainLayout() {
    const location = useLocation();
    const hideNavOn = ["/signin", "/signup"];
    const shouldHideNav = hideNavOn.includes(location.pathname);

    return (
        <div className='min-h-screen'>
            {!shouldHideNav && (
                <nav className='fixed top-0 left-0 right-0 z-50 h-16 bg-white dark:bg-slate-900 shadow-sm'>
                    <NavBar />
                </nav>
            )}

            <main className={`pt-16 min-h-screen ${shouldHideNav ? "pt-0" : ""}`}>
                <Outlet />
            </main>
        </div>
    );
}
