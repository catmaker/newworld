// pages/api/test.js
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const data = await req.json();
    console.log(data);
    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
  }
};
