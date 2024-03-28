import { useSelector } from '../../services/store';
import { Navigate } from 'react-router-dom';
import { selectAuth, selectUser } from '../../services/slice';
import { Preloader } from '../ui/preloader';
import { ProtectedRouteProps } from './type';

export function ProtectedRoute({ children, onlyUnAuth }: ProtectedRouteProps) {
  const checkAuth = useSelector(selectAuth);
  const user = useSelector(selectUser).name;
  if (!checkAuth) return <Preloader />;
  if (!user && !onlyUnAuth) return <Navigate replace to='/login' />;
  if (user && onlyUnAuth) return <Navigate replace to='/' />;
  return children;
}
