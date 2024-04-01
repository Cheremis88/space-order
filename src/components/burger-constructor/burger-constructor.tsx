import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectConstructor,
  resetConstructor
} from '../../services/slices/constructorSlice';
import {
  selectLastOrder,
  selectUser,
  orderBurger,
  resetOrder,
  selectStatus
} from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(selectConstructor);
  const orderNumber = useSelector(selectLastOrder);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderRequest = useSelector(selectStatus).loading;
  const ingredientsId = constructorItems.ingredients.map((item) => item._id);
  const burger = [constructorItems.bun?._id || '0', ...ingredientsId];

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user.name) {
      navigate('/login');
      return;
    }
    dispatch(orderBurger(burger));
  };
  const closeOrderModal = () => {
    if (orderRequest) return;
    dispatch(resetConstructor());
    dispatch(resetOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderNumber}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
