import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";

const controls = [
  { label: "Meat", type: "meat" },
  { label: "Bacon", type: "bacon" },
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" }
];
const buildControls = props => (
  <div className={classes.BuildControls}>
    {controls.map(control => (
      <BuildControl
        ingredientCount={props.ingredients[control.type]}
        add={() => props.addIngredient(control.type)}
        remove={() => props.removeIngredient(control.type)}
        key={control.label}
        label={control.label}
      />
    ))}
    <button onClick={props.orderClicked} className={classes.OrderBtn}>Order now!</button>
  </div>
);

export default buildControls;
