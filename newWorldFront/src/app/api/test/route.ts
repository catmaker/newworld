// pages/api/test.js
import { NextRequest, NextResponse } from "next/server";
export const GET = async (req: NextRequest) => {
  try {
    return NextResponse.json({ msg: "hello!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
};
