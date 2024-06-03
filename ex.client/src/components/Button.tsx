import React from "react";

type ButtonProps = {
  bubble?: number;
  value?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  danger?: boolean;
  large?: boolean;
  onClick?: Function;
};

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = (
  props
) => {
  const classes = Object.keys(props);

  return (
    <button
      className={"btn " + classes.join(" ")}
      data-count={props.bubble}
      type={props.type}
      onClick={() => props.onClick?.(true)}
    >
      {props.value} {props.children}
    </button>
  );
};
