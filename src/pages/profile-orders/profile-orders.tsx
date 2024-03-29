import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { selectHistory } from '../../services/slice';
import { fetchHistory } from '../../services/slice';
import { Preloader } from '@ui';
import { useEffect } from 'react';
export const ProfileOrders: FC = () => {
  const orders = useSelector(selectHistory);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHistory());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }
  return <ProfileOrdersUI orders={orders} />;
};
