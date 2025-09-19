import { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import * as authAPI from '../services/authAPI'

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const res = await authAPI.getCurrentUser();
            setUser(res.data.user);
            return res.data.user;
        } catch (err) {
            console.error('Error fetching user:', err);
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const login = async (credentials) => {
        const res = await authAPI.login(credentials);
        await fetchUser();
        return res;
    };

    const logout = async () => {
        try {
            await authAPI.logout();
        } catch (err) {
            console.error('Logout failed:', err);
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
}