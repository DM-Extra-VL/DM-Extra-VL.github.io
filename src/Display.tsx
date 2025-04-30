import React from "react";

interface DisplayProps {
    input: string;
    darkMode: boolean;
}

const Display: React.FC<DisplayProps> = ({ input, darkMode }) => {
    return (
        <div className={`mb-2 p-2 text-right text-xl font-mono ${darkMode ? "bg-gray-700" : "bg-gray-200"} rounded`}>
            {input || "0"}
        </div>
    );
};

export default Display;
