"use client";
import { useState } from "react";

export const useInputField = (maxLength: number) => {
  const [value, setValue] = useState("");
  const [warning, setWarning] = useState("");

  const handleChange = (e: any) => {
    setValue(e.target.value);
    if (e.target.value.length > maxLength) {
      setWarning("13자 이내로 작성해주세요.");
    } else {
      setWarning("");
    }
  };

  return { value, warning, handleChange };
};
