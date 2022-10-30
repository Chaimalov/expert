import React from "react";

export const Button = (props) => {
  const classes = Object.keys(props).filter((item) => !!props[item]);

  return (
    <button
      className={"btn " + classes.join(" ")}
      data-count={props.bubble}
      type={props.type}
      onClick={props.onClick ? () => props.onClick(true) : null}
    >
      {props.value} {props.children}
    </button>
  );
};
