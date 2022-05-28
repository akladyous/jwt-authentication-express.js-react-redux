import { userState } from "../features/users/userSlice.js"
import { useSelector } from "react-redux"
import { useLocation, Navigate, Outlet } from "react-router-dom"

export default function ProtectedRoutes() {
    const location = useLocation();
    const state = useSelector(userState);
    return (
        state.isAuthenticated
            ? <Outlet />
            : <Navigate to="/users/signin" state={{ from: location }} replace />
    )
}
