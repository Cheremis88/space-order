import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from '../../services/store';
import { useDispatch } from '../../services/store';
import { selectFeeds, fetchFeeds } from '../../services/slice';

export const Feed: FC = () => {
  const feeds = useSelector(selectFeeds);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeeds());
  }, []);

  if (!feeds) {
    return <Preloader />;
  }
  return (
    <FeedUI
      orders={feeds.orders}
      handleGetFeeds={() => dispatch(fetchFeeds())}
    />
  );
};
