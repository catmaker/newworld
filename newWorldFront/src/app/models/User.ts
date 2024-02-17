import { User as NextAuthUser } from "next-auth";

export default interface User extends NextAuthUser {
  id: string;
  name: string;
  nickname: string;
}
