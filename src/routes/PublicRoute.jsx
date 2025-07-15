import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;

    if (!user) return children

    const role = user.role || 'user'
    const roleDashboardMap = {
        admin: '/dashboard/admin',
        publisher: '/dashboard/publisher',
        user: '/dashboard/user',
    }

    const redirectPath = roleDashboardMap[role] || '/dashboard/user'

    return <Navigate to={redirectPath} />
}
