import React, { MouseEventHandler } from "react";

interface ButtonProps extends React.PropsWithChildren {
  bubble?: number;
  value?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  danger?: boolean;
  large?: boolean;
  onClick?: (flag: boolean) => void;
}

export const Button = (props: ButtonProps) => {
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
