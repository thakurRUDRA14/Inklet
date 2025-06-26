import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";

export default function MainLayout() {
    return (
        <div className='min-h-screen flex flex-col'>
            <NavBar />
            <Outlet />
        </div>
    );
}
