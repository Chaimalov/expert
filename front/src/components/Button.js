import React from "react";

export function Button({
  value,
  large,
  danger,
  secondary,
  bubble,
  type,
  onClick,
}) {
  return (
    <button
      className={
        "btn " +
        (danger
          ? "danger"
          : secondary
          ? "secondary"
          : bubble
          ? "bubble"
          : large
          ? "large"
          : "")
      }
      data-count={bubble}
      type={type}
      onClick={onClick ? () => onClick(true) : null}
    >
      {value}
    </button>
  );
}
