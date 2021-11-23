import React, { useEffect } from "react";
import { useState } from "react";

export default function Tooltip({ message }) {
  const [hover, setHover] = useState(false);
  const [X, setX] = useState(null);
  const [Y, setY] = useState(null);

  useEffect(() => {
    const listener = (event) => {
      setX(event.clientX);
      setY(event.clientY);
    };
    if (hover) {
      document.addEventListener("mousemove", listener);
    } else {
    }
    return () => {
      document.removeEventListener("mousemove", listener);
    };
  }, [hover]);
  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <div
        className={`${
          hover ? "flex" : "hidden"
        } fixed    p-2 rounded-xl h-10     w-max bg-white dark:bg-gray-900 text-footer transition-all shadow-md border-t`}
        style={{ top: Y - 50, left: X - 25 }}
      >
        <div className="absolute w-4 h-4 transform rotate-45 -bottom-2 left-4 bg-white"></div>
        {message}
      </div>
    </div>
  );
}
