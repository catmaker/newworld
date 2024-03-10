import { Session } from "next-auth";

export interface MySession extends Session {
  user: {
    name: string;
    email: string;
    imageFilePath: string;
    nickname: string;
    id: string;
    signupDate: string;
    puzzleCount: number;
    point: number;
  };
}
