import React from "react";
import classes from "./OrderSummary.css";

const orderSummary = props => {
  let ingredient = null;
  let ingredientSum = null;

  ingredient = Object.keys(props.ingredients).map(
    ingredient =>
      props.ingredients[ingredient] ? (
        <li key={ingredient}>
          <span style={{ textTransform: "capitalize" }}>{ingredient}</span> :{" "}
          {props.ingredients[ingredient]}
        </li>
      ) : null
  );

  ingredientSum = Object.keys(props.ingredients).reduce((sum, ingredient) => {
    return sum + props.ingredients[ingredient];
  }, 0);

  //some logic here
  return (
    <React.Fragment>
      {ingredientSum ? (
        <React.Fragment>
          <h3>Your Burger:</h3>
          <p>Ingredients</p>
          <ul>{ingredient}</ul>
        </React.Fragment>
      ) : (
        <h2>Are you sure you want just buns?</h2>
      )}

      <button onClick={props.cancel} className={classes.Less}>
        WAIT, i want to change it!
      </button>
      <button onClick={props.confirm} className={classes.More}>
        Confirm, let's order!
      </button>
    </React.Fragment>
  );
};

export default orderSummary;
