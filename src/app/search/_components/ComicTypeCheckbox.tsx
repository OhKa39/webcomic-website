
import React from "react";

interface ComicTypeCheckboxProps {
    id: string;
    value: string;
    label: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ComicTypeCheckbox: React.FC<ComicTypeCheckboxProps> = ({ id, value, label, checked, onChange }) => {
    return (
        <div className="flex items-center space-x-1">
            <input
                type="checkbox"
                id={id}
                value={value}
                onChange={onChange}
                checked={checked}
                className="form-checkbox h-4 w-4 text-blue-500"
            />
            <label htmlFor={id} className="text-white text-sm">
                {label}
            </label>
        </div>
    );
};

export default ComicTypeCheckbox;
