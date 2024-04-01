import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { selectIngredients } from '../../services/slices/ingredientsSlice';
import { selectOrders } from '../../services/slices/userSlice';
import { selectFeed } from '../../services/slices/feedSlice';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { fetchOrders } from '../../services/slices/userSlice';
import { fetchFeed } from '../../services/slices/feedSlice';
import { useLocation } from 'react-router-dom';

export const OrderInfo: FC = () => {
  const location = useLocation();
  const isUserOrder = location.pathname.includes('profile');
  const isOutside = !location.state?.background;
  const ingredients = useSelector(selectIngredients).all;
  const userOrders = useSelector(selectOrders);
  const feed = useSelector(selectFeed);
  const orders = isUserOrder ? userOrders : feed.feed?.orders;
  const dispatch = useDispatch();
  const { number } = useParams();
  const orderData = orders?.find((item) => item.number === Number(number));

  useEffect(() => {
    if (isOutside) {
      dispatch(fetchIngredients());
      isUserOrder ? dispatch(fetchOrders()) : dispatch(fetchFeed());
    }
  }, []);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
