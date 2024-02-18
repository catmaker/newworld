// pages/api/test.js
import { NextRequest, NextResponse } from "next/server";
export const GET = async (req: NextRequest) => {
  try {
    return NextResponse.json({
      name: "신지수",
      puzzleCount: "22",
      point: "1000",
      signupDate: "20240130",
      image: "https://avatars.githubusercontent.com/u/77449822?v=4",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
};
