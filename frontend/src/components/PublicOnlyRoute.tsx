import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import type { ReactNode } from "react";
import { isAuthenticatedSelector } from "../recoil/authSelector";

const PublicOnlyRoute = ({ children }: { children: ReactNode }) => {
    const isAuthenticated = useRecoilValue(isAuthenticatedSelector);

    if (isAuthenticated) {
        return (
            <Navigate
                to='/blogs'
                replace
            />
        );
    }

    return <>{children}</>;
};

export default PublicOnlyRoute;
