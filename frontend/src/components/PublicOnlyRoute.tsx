import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/authAtoms";
import type { ReactNode } from "react";

const PublicOnlyRoute = ({ children }: { children: ReactNode }) => {
    const user = useRecoilValue(userState);

    if (user) {
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
