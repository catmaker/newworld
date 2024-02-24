import React from "react";
import Rain from "./Rain";

const Rains: React.FC = () => {
  return (
    <>
      {Array.from({ length: 100 }).map((_, i) => {
        const length = Math.random() * 5;
        return <Rain key={i} length={length} />;
      })}
    </>
  );
};

export default Rains;
