import React, { useState, useEffect } from "react";
import Display from "./Display.tsx";
import Button from "./Button.tsx";

const MAX_INPUT_LENGTH = 25;

const Calculator: React.FC = () => {
    const [input, setInput] = useState<string>("");
    const [history, setHistory] = useState<string[]>([]);
    const [darkMode, setDarkMode] = useState<boolean>(false);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            const { key } = event;

            setInput((prev) => {
                if (prev.length >= MAX_INPUT_LENGTH && /\d|\.|\+|\-|\*|\//.test(key)) {
                    return prev;
                }
                if (/\d|\.|\+|\-|\*|\//.test(key)) {
                    return prev + key;
                } else if (key === "Enter") {
                    handleButtonClick("=");
                    return prev;
                } else if (key === "Backspace") {
                    return prev.slice(0, -1);
                } else if (key === "Escape") {
                    return "";
                }
                return prev;
            });
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    const handleButtonClick = (value: string) => {
        setInput((prevInput) => {
            if (value === "C") {
                return "";
            } else if (value === "⌫") {
                return prevInput.slice(0, -1);
            } else if (value === "=") {
                try {
                    if (!prevInput) return prevInput;
                    if (prevInput.includes("/0")) {
                        throw new Error("Ошибка: Деление на ноль");
                    }

                    const result = eval(prevInput);

                    setHistory((prevHistory) => [...prevHistory, `${prevInput} = ${result}`]);

                    return String(result);
                } catch {
                    return "Ошибка";
                }
            } else {
                if (prevInput.length >= MAX_INPUT_LENGTH) {
                    return prevInput;
                }
                return prevInput + value;
            }
        });
    };

    return (
        <div className={`flex flex-col items-center justify-center min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
            <div className={`p-4 ${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md w-80`}>
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`mb-2 p-2 rounded ${darkMode ? "text-black bg-gray-700 hover:bg-gray-600" : "text-white bg-gray-600 hover:bg-gray-400"}`}
                >
                    {darkMode ? "Светлая тема" : "Темная тема"}
                </button>

                <Display input={input} darkMode={darkMode} />

                <div className="grid grid-cols-4 gap-2">
                    {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+", "C", "⌫"].map((char) => (
                        <Button key={char} value={char} onClick={handleButtonClick} darkMode={darkMode} />
                    ))}
                </div>

                <div className={`mt-4 p-2 ${darkMode ? "bg-gray-700" : "bg-gray-100"} rounded overflow-auto h-20 text-sm`}>
                    {history.map((entry, index) => (
                        <div key={index} className="text-right">{entry}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Calculator;
