import React from "react";
import { capitalizeWord } from "../../../utils/utils";

interface RadioInputProps {
  name: string;
  value: string | number;
  checkedPredicate: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioInput = ({
  name,
  value,
  checkedPredicate,
  onChange,
}: RadioInputProps) => {
  return (
    <label>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checkedPredicate}
        onChange={onChange}
      />
      {capitalizeWord("" + value)}
    </label>
  );
};

export default RadioInput;
