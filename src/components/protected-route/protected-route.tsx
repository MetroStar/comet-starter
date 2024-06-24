import useAuth from '@src/hooks/use-auth';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = (): React.ReactElement => {
  const { isSignedIn, isLoading } = useAuth();
  if (isLoading)
    return (
      <div className="grid-container">
        <div>Loading...</div>
      </div>
    );

  return isSignedIn ? <Outlet /> : <Navigate to="/signin" />;
};
