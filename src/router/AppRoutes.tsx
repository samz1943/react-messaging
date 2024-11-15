import { useRoutes, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import FullLayout from '../components/FullLayout';
import ChatRoom from '../pages/ChatRoom';

function AppRoutes() {
    const isAuthenticated = Boolean(localStorage.getItem('token'));

    const routes = useRoutes([
        {
            path: '/',
            element: <FullLayout />,
            children: [
                { index: true, element: isAuthenticated ? <Navigate to="/dashboard" /> : <Login /> },
                { path: 'dashboard', element: isAuthenticated ? <Dashboard /> : <Navigate to="/" /> },
                { path: '/chat/:id', element: isAuthenticated ? <ChatRoom /> : <Navigate to="/" /> },
                { path: '*', element: <NotFound /> },
            ]
        }
    ]);

    return routes;
}

export default AppRoutes;
