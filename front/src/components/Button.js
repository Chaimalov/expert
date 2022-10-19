import React from "react";

export function Button(props) {
  const classes = Object.keys(props).filter((item) => props[item] === true);

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
}
