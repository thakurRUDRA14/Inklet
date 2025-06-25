import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blog from "./pages/Blog";
import Blogs from "./pages/Blogs";
import { useHydrateUser } from "./hooks/useHydrateUser";
import MainLayout from "./layouts/MainLayout";
import Publish from "./pages/Publish";
import EditBlog from "./pages/EditBlog";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicOnlyRoute from "./components/PublicOnlyRoute";

function App() {
    useHydrateUser();

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/signin'
                    element={
                        <PublicOnlyRoute>
                            <Signin />
                        </PublicOnlyRoute>
                    }
                />
                <Route
                    path='/signup'
                    element={
                        <PublicOnlyRoute>
                            <Signup />
                        </PublicOnlyRoute>
                    }
                />

                <Route
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }>
                    <Route
                        path='/blogs'
                        element={<Blogs />}
                    />
                    <Route
                        path='/blogs/:id'
                        element={<Blog />}
                    />
                    <Route
                        path='/new-story'
                        element={<Publish />}
                    />
                    <Route
                        path='/b/:id/edit'
                        element={<EditBlog />}
                    />
                    <Route
                        path='/u/profile'
                        element={<Profile />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
