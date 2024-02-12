// pages/api/test.js
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
  try {
    const response = await fetch("/loginMember", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        /* request body */
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
};
