import React, { useState } from "react";

const ToggleButton = ({ initialValue = true, onChange }: any) => {
  const [isActive, setIsActive] = useState(initialValue);

  const toggle = () => {
    const newValue = !isActive;
    setIsActive(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <button
      className={`rounded-full w-12 h-6 flex items-center justify-center focus:outline-none ${
        isActive ? "bg-green-500" : "bg-red-500"
      }`}
      onClick={toggle}
    >
      <div
        className={`rounded-full w-5 h-5 me-4 bg-white shadow-md transform transition-transform ${
          isActive ? "translate-x-5" : "-translate-x-1"
        }`}
      ></div>
    </button>
  );
};

export default ToggleButton;
