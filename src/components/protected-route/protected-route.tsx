import { useSelector } from '../../services/store';
import { Navigate } from 'react-router-dom';
import { selectAuth, selectUser } from '../../services/slices/userSlice';
import { Preloader } from '../ui/preloader';
import { ProtectedRouteProps } from './type';
import { useLocation } from 'react-router-dom';

export function ProtectedRoute({ children, onlyUnAuth }: ProtectedRouteProps) {
  const location = useLocation();
  const checkAuth = useSelector(selectAuth);
  const user = useSelector(selectUser).name;
  if (!checkAuth) return <Preloader />;
  if (!user && !onlyUnAuth)
    return <Navigate replace to='/login' state={{ from: location }} />;
  if (user && onlyUnAuth) {
    const fromProfile =
      location.state?.from?.pathname === '/profile' ? '/' : false;
    const from = fromProfile || location.state?.from || '/';
    return <Navigate replace to={from} />;
  }
  return children;
}
