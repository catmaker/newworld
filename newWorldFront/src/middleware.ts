import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 이 함수는 내부에서 `await`를 사용하는 경우 `async`로 표시될 수 있습니다.
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL("/login", request.url));
}

export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/mypage/:path*"],
};
