import React from "react";
import {capitalizeWord} from "../../../utils/utils";

interface RadioInputProps {
  name: string;
  value: string | number;
  checkedPredicate: boolean;
  onClick: (e: React.MouseEvent<HTMLInputElement>) => void;
}

const RadioInput = ({
  name,
  value,
  checkedPredicate,
  onClick,
}: RadioInputProps) => {
  return (
    <label>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checkedPredicate}
        onClick={onClick}
        readOnly
      />
      {capitalizeWord('' + value)}
    </label>
  );
};

export default RadioInput;
