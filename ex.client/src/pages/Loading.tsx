import React from "react";

export const Loading: React.FC = () => {
  return (
    <main className="loader-container">
      <div className="loader">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="block" />
        ))}
      </div>
    </main>
  );
};
