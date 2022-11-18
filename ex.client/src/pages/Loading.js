import React from "react";

export function Loading() {
  return (
    <main className="loader-container">
      <div className="loader">
        {[...Array(9)].map((e, i) => (
          <div className="block" />
        ))}
      </div>
    </main>
  );
}
