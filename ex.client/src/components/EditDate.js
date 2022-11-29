import React, { useRef, useState, forwardRef } from "react";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";

export const EditDate = forwardRef(({ days, value }, ref) => {
  const numberRef = useRef();
  const [number, setNumber] = useState(value);

  return (
    <div>
      <label className="date">{days}</label>
      <div className="num-input-container">
        <input
          min="1"
          ref={numberRef}
          type="number"
          className="date"
          value={number}
          onChange={(e) => {
            setNumber(e.target.value);
          }}
        />
        <div className="arrows">
          <GoTriangleUp
            onClick={() => {
              setNumber((prev) => prev + 1);
            }}
          />
          <GoTriangleDown
            onClick={() => {
              setNumber((prev) => prev - 1);
            }}
          />
        </div>
      </div>
      <button>save</button>
    </div>
  );
});
