import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { selectIngredients } from '../../services/slice';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/slice';

export const IngredientDetails: FC = () => {
  const ingredients = useSelector(selectIngredients);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (!ingredients.all.length) {
      dispatch(fetchIngredients());
    }
  }, []);

  const ingredientData = ingredients.all.find((item) => item._id === id);
  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
