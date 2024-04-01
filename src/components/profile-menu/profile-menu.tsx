import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { deleteCookie } from '../../utils/cookie';
import { useDispatch } from '../../services/store';
import { resetUser } from '../../services/slices/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
    dispatch(resetUser());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
