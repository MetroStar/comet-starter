import useAuth from '@src/hooks/use-auth';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = (): React.ReactElement => {
  const { isSignedIn } = useAuth();
  return isSignedIn ? <Outlet /> : <Navigate to="/signin" />;
};
