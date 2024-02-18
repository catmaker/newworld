// models/Session.ts
export interface Session {
  user: {
    name: string;
    userId: string;
    nickname: string;
  };
  expires: string;
}
