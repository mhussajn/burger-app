import React from "react";
import classes from "./BuildControl.css";

const buildControl = props => (
  <React.Fragment>
    <div className={classes.Control}>
      <div className={classes.Label}>{props.label}</div>
      <button
        disabled={props.ingredientCount === 0}
        onClick={props.remove}
        className={classes.Less}
      >
        Less
      </button>
      <div className={classes.Number}>{props.ingredientCount}</div>
      <button onClick={props.add} className={classes.More}>
        More
      </button>
    </div>
  </React.Fragment>
);

export default buildControl;
