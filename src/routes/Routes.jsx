import Login from '../pages/Login'
import Home from '../pages/Home'
import Signup from '../pages/Signup'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import RoleRoute from './RoleRoute'
import VerifyEmail from '../pages/VerifyEmail'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'
import AdminDashboard from '../pages/AdminDashboard'
import PublisherDashboard from '../pages/PublisherDashboard'
import UserDashboard from '../pages/UserDashboard'
import ProductPage from '../pages/ProductPage'
import CartPage from '../pages/CartPage'
import CheckoutPage from '../pages/CheckoutPage'
import ProductsPage from '../pages/ProductsPage'

export const appRoutes = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/products',
        element: <ProductsPage />,
    },
    {
        path: '/product/:id',
        element: <ProductPage />,
    },
    {
        path: '/cart',
        element: <CartPage />,
    },
    {
        path: '/checkout',
        element: <CheckoutPage />,
    },
    {
        path: '/login',
        element: (
            <PublicRoute>
                <Login />
            </PublicRoute>
        ),
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />,
    },
    {
        path: '/reset-password/:token',
        element: <ResetPassword />,
    },
    {
        path: '/signup',
        element: (
            <PublicRoute>
                <Signup />
            </PublicRoute>
        )
    },
    {
        path: '/verify-email/:token',
        element: <VerifyEmail />,
    },
    {
        path: '/dashboard/admin',
        element: (
            <PrivateRoute>
                <RoleRoute role="admin">
                    <AdminDashboard />
                </RoleRoute>
            </PrivateRoute>
        ),
    },
    {
        path: '/dashboard/publisher',
        element: (
            <PrivateRoute>
                <RoleRoute role="publisher">
                    <PublisherDashboard />
                </RoleRoute>
            </PrivateRoute>
        ),
    },
    {
        path: '/dashboard/user',
        element: (
            <PrivateRoute>
                <RoleRoute role="user">
                    <UserDashboard />
                </RoleRoute>
            </PrivateRoute>
        ),
    },
    {
        path: '*',
        element: <div>404 - Not Found</div>,
    },
]
