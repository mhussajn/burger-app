import * as actionTypes from "../actions";

const initialState = {
  ingredients: { salad: 0, meat: 0, bacon: 0, cheese: 0 },
  totalPrice: 1.5
};

const PRICES = { meat: 1, cheese: 0.5, salad: 0.3, bacon: 0.7 };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]: state.ingredients[action.ingredientType] + 1
        },
        totalPrice: state.totalPrice + PRICES[action.ingredientType]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]: state.ingredients[action.ingredientType] - 1
        },
        totalPrice: state.totalPrice - PRICES[action.ingredientType]
      };
    default:
      return state;
  }
};

export default reducer;
