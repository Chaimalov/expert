import React from "react";

export function Button({ value, danger, secondary, bubble, type, onClick }) {
  return (
    <button
      className={
        "btn " +
        (danger ? "danger" : secondary ? "secondary" : bubble ? "bubble" : "")
      }
      data-count={bubble}
      type={type}
      onClick={onClick ? () => onClick(true) : null}
    >
      {value}
    </button>
  );
}
