import { ChangeEventHandler, FocusEventHandler, forwardRef } from "react";

type InputProps = {
  name: string;
  type: string;
  placeholder?: string;
  autoFocus?: boolean;
  error?: string;
  onFocus?: FocusEventHandler;
  onChange?: ChangeEventHandler;
  disabled?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { name, type, placeholder, autoFocus, error, onFocus, onChange, disabled },
    ref
  ) => (
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
        disabled={disabled}
        autoFocus={autoFocus}
        onFocus={onFocus}
        onChange={onChange}
      />
    </div>
  )
);
