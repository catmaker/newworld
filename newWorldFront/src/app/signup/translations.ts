type LanguageKeys = "en" | "ko";

type Translations = {
  [key in LanguageKeys]: {
    startForFree: string;
    createNewAccount: string;
    alreadyAMember: string;
    logIn: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    signUp: string;
    changeToKorean: string;
    changeToEnglish: string;
  };
};

export const translations = {
  en: {
    startForFree: "START FOR FREE",
    createNewAccount: "Create new account",
    alreadyAMember: "Already A Member?",
    logIn: "Log In",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    signUp: "Sign Up",
    changeToKorean: "Change to Korean", // 추가
    changeToEnglish: "Change to EN",
  },
  ko: {
    startForFree: "무료로 시작하기",
    createNewAccount: "새 계정 만들기",
    alreadyAMember: "이미 회원이신가요?",
    logIn: "로그인",
    firstName: "이름",
    lastName: "성",
    email: "이메일",
    password: "비밀번호",
    confirmPassword: "비밀번호 확인",
    signUp: "가입하기",
    changeToKorean: "한글로 변경", // 추가
    changeToEnglish: "영어로 변경",
  },
};
