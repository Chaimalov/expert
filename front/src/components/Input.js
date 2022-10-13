import { forwardRef } from "react";

export const Input = forwardRef(
  ({ name, type, placeholder, autoFocus, error, onFocus, onChange }, ref) => (
    <div className={`input ${error && "danger"}`}>
      <label htmlFor={name}>
        <h4>{name}:</h4>
      </label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder || ""}
        required
        ref={ref}
        autoFocus={autoFocus}
        onFocus={onFocus}
        onChange={onChange}
      />
    </div>
  )
);
