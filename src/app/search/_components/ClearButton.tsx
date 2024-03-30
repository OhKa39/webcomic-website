import React from "react";
import { GrPowerReset } from "react-icons/gr";

interface ClearButtonProps {
  onClick: () => void;
}

const ClearButton: React.FC<ClearButtonProps> = ({ onClick }) => {
  return (
    <button
      className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-8 rounded flex justify-center items-center"
      onClick={onClick}
    >
      <GrPowerReset size={20} className="m-1 items-bold" />
    </button>
  );
};

export default ClearButton;
