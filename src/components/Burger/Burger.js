import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.css";

const burger = props => {
  let ingredients = Object.keys(props.ingredients).map(ingredient => {
    return Array(props.ingredients[ingredient])
      .fill(ingredient)
      .map((element, index) => (
        <BurgerIngredient key={element + index} type={element} />
      ));
  });

  if (ingredients.every(ingredient => ingredient.length === 0)) {
    ingredients = <h1>Add some ingredients!</h1>;
  }

  let price = null;

  if (props.price) {
    price = <h1>Burger Cost: {props.price.toFixed(2)}$</h1>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={"bread-top"} />
      {ingredients}
      <BurgerIngredient type={"bread-bottom"} />
      {price}
    </div>
  );
};

export default burger;
