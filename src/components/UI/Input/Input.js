import React from "react";
import classes from "./Input.css";

const input = props => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (!props.valid && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          onChange={props.changed}
          value={props.value}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          onChange={props.changed}
          value={props.value}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
        />
      );
      break;

    default:
      inputElement = (
        <input
          onChange={props.changed}
          value={props.value}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
        />
      );
      break;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
