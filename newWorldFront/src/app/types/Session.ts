import { Session } from "next-auth";

export interface MySession extends Session {
  user: {
    name: string;
    email: string;
    image: string;
    nickname: string;
    id: string;
  };
}
