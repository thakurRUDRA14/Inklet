import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import type { ReactNode } from "react";
import { isAuthenticatedSelector } from "../recoil/authSelector";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const isAuthenticated = useRecoilValue(isAuthenticatedSelector);

    if (!isAuthenticated) {
        return (
            <Navigate
                to='/signin'
                replace
            />
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;
