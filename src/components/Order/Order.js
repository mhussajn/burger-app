import React from "react";
import classes from "./Order.css";
import Burger from "../Burger/Burger";

const order = props => {
  let ingredients = Object.keys(props.ingredients).map(ingredient => {
    if (props.ingredients[ingredient]) {
      return (
        <li key={ingredient}>
          {ingredient} : {props.ingredients[ingredient]}
        </li>
      );
    } else {
      return null;
    }
  });

  return (
    <div className={classes.Order}>
      <div className={classes.Info}>
        <h3>Burger for {props.customer.name}</h3>
        <h4>Ingredients:</h4>
        <ul>{ingredients}</ul>
        <p>Price: {props.price}</p>
      </div>
      <div className={classes.Burger}>
        <Burger ingredients={props.ingredients} />
      </div>
    </div>
  );
};

export default order;
