import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        userId: { label: "Username", type: "text", placeholder: "jsmith" },
        userPassword: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<string, string> | undefined, req) {
        // credentials 객체가 undefined가 아닌지 확인합니다.
        if (credentials) {
          // credentials 객체에는 사용자가 입력한 아이디와 비밀번호가 포함되어 있습니다.
          const { userId, userPassword } = credentials;
          // 여기서 사용자가 입력한 아이디와 비밀번호를 검증합니다.
          const res = await fetch("http://localhost:8080/loginMember", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });
          const result = await res.json();
          console.log(result);
          // 이미 /loginMember에서 비교는 다 끝난 상황이므로, text인지 null인지만 확인하면 됩니다.
          if (res.status !== 200) {
            throw new Error("로그인 실패");
          }
          if (result) {
            // 검증이 성공하면 사용자 객체를 반환합니다.
            // 이 객체는 JWT의 `user` 속성에 저장됩니다.
            console.log(result);
            return {
              id: userId,
              name: result.name,
              nickname: result.nickname,
              signupDate: result.signupDate,
              puzzleCount: result.puzzleCount,
              point: result.point,
              imageFilePath: result.imageFilePath,
            };
          } else {
            // 검증이 실패하면 null을 반환합니다.
            // 이 경우, NextAuth.js는 로그인 실패 메시지를 표시합니다.
            return null;
          }
        } else {
          // credentials 객체가 undefined인 경우, null을 반환합니다.
          return null;
        }
      },
    }),
  ],
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
};
