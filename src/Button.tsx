import React from "react";

interface ButtonProps {
  value: string;
  onClick: (value: string) => void;
  darkMode: boolean;
}

const Button: React.FC<ButtonProps> = ({ value, onClick, darkMode }) => {
  return (
    <button
      onClick={() => onClick(value)}
      className={`p-5 text-xl rounded-full hover:bg-gray-400 dark:hover:bg-gray-500 ${darkMode ? "bg-gray-600" : "bg-gray-300"}`}
    >
      {value}
    </button>
  );
};

export default Button;
