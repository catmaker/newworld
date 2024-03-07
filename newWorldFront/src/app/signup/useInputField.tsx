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

export const useEmailField = () => {
  const [value, setValue] = useState("");
  const [warning, setWarning] = useState("");

  const handleChange = (e: any) => {
    setValue(e.target.value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(e.target.value)) {
      setWarning("유효한 이메일 주소를 입력해주세요.");
    } else {
      setWarning("");
    }
  };

  return { value, warning, handleChange };
};

export const usePasswordField = (minLength: number, maxLength: number) => {
  const [value, setValue] = useState("");
  const [warning, setWarning] = useState("");

  const handleChange = (e: any) => {
    setValue(e.target.value);
    if (e.target.value.length < minLength) {
      setWarning("비밀번호는 최소 8자 이상이어야 합니다.");
    } else if (e.target.value.length > maxLength) {
      setWarning("비밀번호는 최대 13자까지 가능합니다.");
    } else {
      setWarning("");
    }
  };

  return { value, warning, handleChange };
};

export const usePhoneNumberField = (minLength: number, maxLength: number) => {
  const [value, setValue] = useState("");

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };
  return { value, handleChange };
};

export const useNicknameField = (minLength: number, maxLength: number) => {
  const [value, setValue] = useState("");
  const [warning, setWarning] = useState("");

  const handleChange = (e: any) => {
    setValue(e.target.value);
    if (e.target.value.length < minLength) {
      setWarning("닉네임은 최소 2자 이상이어야 합니다.");
    } else if (e.target.value.length > maxLength) {
      setWarning("닉네임은 최대 10자까지 가능합니다.");
    } else {
      setWarning("");
    }
  };

  return { value, warning, handleChange };
};

export const useBirthDayField = () => {
  const [value, setValue] = useState("");

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };
  return { value, handleChange };
};
