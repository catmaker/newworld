// pages/api/test.js
import { NextRequest, NextResponse } from "next/server";
export const GET = async (req: NextRequest) => {
  try {
    return NextResponse.json({
      sin: {
        clearPoints: 300,
        attendancePoints: 400,
        totalPoints: 700,
      },
      jung: {
        clearPoints: 100,
        attendancePoints: 100,
        totalPoints: 200,
      },
      kim: {
        clearPoints: 100,
        attendancePoints: 100,
        totalPoints: 200,
      },
      lee: {
        clearPoints: 200,
        attendancePoints: 200,
        totalPoints: 400,
      },
      park: {
        clearPoints: 50,
        attendancePoints: 100,
        totalPoints: 150,
      },
      choi: {
        clearPoints: 100,
        attendancePoints: 100,
        totalPoints: 200,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
};
