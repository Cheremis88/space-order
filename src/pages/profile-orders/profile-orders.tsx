import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { selectOrders, fetchOrders } from '../../services/slices/userSlice';
import { Preloader } from '@ui';
import { useEffect } from 'react';
export const ProfileOrders: FC = () => {
  const orders = useSelector(selectOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrders());
  }, [selectOrders]);

  if (!orders.length) {
    return <Preloader />;
  }
  return <ProfileOrdersUI orders={orders} />;
};
