export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/mypage/:path*",
    "/api/:path*",
    "/community/:path*",
    "/labyrinth/:path*",
    "/ranking/:path*",
  ],
};
