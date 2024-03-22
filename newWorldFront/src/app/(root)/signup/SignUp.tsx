"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/assets/scss/section/_signup.module.scss";
import "@/app/globals.scss";
import {
  useEmailField,
  useInputField,
  usePasswordField,
  usePhoneNumberField,
} from "./useInputField";
import Image from "next/image";
import hide from "/public/img/hide-password.png";
import show from "/public/img/show-password.png";
import { useRouter } from "next/navigation";
import { postJoinAPI } from "@/app/lib/api/join";
const SignUp = () => {
  const router = useRouter();
  // 패스워드 보이기/숨기기
  const [showPassword, setShowPassword] = useState(false);
  // 이름 입력시 13자 제한 커스텀 훅
  const FirstNameField = useInputField(13);
  const PasswordField = usePasswordField(8, 13);
  const ConfirmPasswordField = useInputField(13);
  const PhoneNumberField = usePhoneNumberField(11, 11);
  const BirthdayField = useInputField(8);
  const NicknameField = useInputField(13);
  // 이메일 정규식 확인 커스텀 훅
  const EmailField = useEmailField();
  // 패스워드 일치 여부 확인
  const [passwordMatch, setPasswordMatch] = useState(true);
  useEffect(() => {
    if (PasswordField.value && ConfirmPasswordField.value) {
      setPasswordMatch(PasswordField.value === ConfirmPasswordField.value);
    }
  }, [PasswordField.value, ConfirmPasswordField.value]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const fields = [
      {
        field: FirstNameField,
        min: 1,
        max: 13,
        message: "이름은 13자 이내로 작성해주세요.",
      },
      { field: EmailField, min: 1, message: "이메일을 입력해주세요." },
      {
        field: PasswordField,
        min: 8,
        max: 13,
        message: "패스워드는 8~13자 이내로 작성해주세요.",
      },
      {
        field: ConfirmPasswordField,
        min: 8,
        max: 13,
        message: "패스워드 확인은 8~13자 이내로 작성해주세요.",
      },
      {
        field: NicknameField,
        min: 5,
        max: 13,
        message: "닉네임은 13자 이내로 작성해주세요.",
      },
      {
        field: PhoneNumberField,
        min: 11,
        max: 11,
        message: "휴대폰 번호는 11자 이내로 작성해주세요.",
      },
      {
        field: BirthdayField,
        min: 7,
        max: 10,
        message: "생년월일은 8자 이내로 작성해주세요.",
      },
    ];

    for (let { field, min, max, message } of fields) {
      if (
        !field.value ||
        field.value.length < min ||
        (max && field.value.length > max)
      ) {
        alert(message);
        return;
      }
    }

    // 패스워드가 서로 일치하는지 확인
    if (PasswordField.value !== ConfirmPasswordField.value) {
      alert("패스워드가 일치하지 않습니다.");
      return;
    }

    // 이메일 형식이 올바른지 확인
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(EmailField.value)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }

    // 모든 조건이 충족되면, 폼 제출 처리를 계속 진행
    const data = {
      name: FirstNameField.value,
      userId: EmailField.value,
      userPassword: PasswordField.value,
      nickname: NicknameField.value,
      phoneNumber: PhoneNumberField.value,
      birthday: BirthdayField.value.replaceAll("-", ""),
    };
    try {
      const response = await postJoinAPI(data);
      if (response?.status === 200) {
        alert("회원가입이 완료되었습니다.");
        router.push("/login");
      } else if (response?.status === 226) {
        if (response.data === "USER_ID_DUPLICATION") {
          alert("이미 사용중인 이메일입니다. 다른 이메일을 입력해주세요.");
        } else if (response.data === "USER_NICKNAME_DUPLICATION") {
          alert("이미 사용중인 닉네임입니다. 다른 닉네임을 입력해주세요.");
        } else {
          alert("이미 가입된 회원입니다.");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.greeting_box}>
            <p>Sign Up</p>
            <p>Please sign up to access your account.</p>
          </div>
          <form className={styles.content_form} onSubmit={handleSubmit}>
            <div>
              <div>
                <input
                  className={styles.content_input_box}
                  type="text"
                  placeholder="이름"
                  onChange={FirstNameField.handleChange}
                />
              </div>
              <div>
                <input
                  placeholder="이메일"
                  className={styles.content_input_box}
                  type="email"
                  onChange={EmailField.handleChange}
                />
                {EmailField.warning && (
                  <p className={styles.warning}>{EmailField.warning}</p>
                )}
              </div>
              <div>
                <input
                  placeholder="비밀번호"
                  className={styles.content_input_box}
                  type={showPassword ? "text" : "password"}
                  onChange={PasswordField.handleChange}
                />
                {/* <Image
                  width={20}
                  height={20}
                  src={showPassword ? hide : show}
                  className={styles.password_toggle}
                  onClick={toggleShowPassword}
                  alt="hide-password"
                /> */}
              </div>
              <div>
                <input
                  placeholder="비밀번호 확인"
                  className={styles.content_input_box}
                  type={showPassword ? "text" : "password"}
                  onChange={ConfirmPasswordField.handleChange}
                />
                {/* <Image
                  width={20}
                  height={20}
                  src={showPassword ? hide : show}
                  className={styles.password_toggle}
                  onClick={toggleShowPassword}
                  alt="hide-password"
                /> */}
              </div>
              {PasswordField.warning && (
                <p className={styles.warning}>{PasswordField.warning}</p>
              )}
              <div>
                <input
                  type="text"
                  className={styles.content_input_box}
                  placeholder="닉네임"
                  onChange={NicknameField.handleChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  className={styles.content_input_box}
                  placeholder="휴대폰 번호"
                  onChange={PhoneNumberField.handleChange}
                />
              </div>
              {PhoneNumberField.warning && (
                <p className={styles.warning}>{PhoneNumberField.warning}</p>
              )}
              <div>
                <input
                  type="date"
                  className={styles.content_input_box}
                  placeholder="생년월일"
                  onChange={BirthdayField.handleChange}
                />
              </div>
            </div>
            {ConfirmPasswordField.warning && (
              <p className={styles.warning}>{ConfirmPasswordField.warning}</p>
            )}
            {PasswordField.value && ConfirmPasswordField.value && (
              <p className={passwordMatch ? styles.success : styles.warning}>
                {passwordMatch
                  ? "비밀번호가 일치합니다."
                  : "비밀번호가 일치하지 않습니다."}
              </p>
            )}
            <input
              className={styles.button}
              type="submit"
              onClick={handleSubmit}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
