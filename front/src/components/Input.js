import { forwardRef } from "react";

export const Input = forwardRef(({ name, type, placeholder }, ref) => (
  <div className="input">
    <label htmlFor={name}>
      <h2>{name}:</h2>
    </label>
    <input
      id={name}
      type={type}
      name={name}
      placeholder={placeholder || ""}
      required
      ref={ref}
      minLength={6}
    />
  </div>
));
