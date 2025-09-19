import useAuth from "../hooks/useAuth"

export default function RoleRoute({ children, role }) {
    const { user, loading } = useAuth()

    if (loading) return <div>Loading...</div>

    if (!user) return <Navigate to="/login" />

    if (user.role !== role) return <Navigate to={`/dashboard/user`} />

    return children
}
