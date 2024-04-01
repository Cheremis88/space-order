import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from '../../services/store';
import { useDispatch } from '../../services/store';
import { selectFeed, fetchFeed } from '../../services/slices/feedSlice';
import {
  selectIngredients,
  fetchIngredients
} from '../../services/slices/ingredientsSlice';

export const Feed: FC = () => {
  const feed = useSelector(selectFeed);
  const ingreds = useSelector(selectIngredients).all;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!ingreds.length) {
      dispatch(fetchIngredients());
    }
    dispatch(fetchFeed());
  }, []);

  if (!feed.feed) {
    return <Preloader />;
  }
  return (
    <FeedUI
      orders={feed.feed.orders}
      handleGetFeeds={() => dispatch(fetchFeed())}
    />
  );
};
