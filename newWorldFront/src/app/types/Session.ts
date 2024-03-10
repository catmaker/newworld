import { Session } from "next-auth";

export interface MySession extends Session {
  user: {
    name: string;
    email: string;
    imageFile: string;
    nickname: string;
    id: string;
    signupDate: string;
    puzzleCount: number;
    point: number;
  };
}
