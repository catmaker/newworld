import React from "react";
import Ranking from "./Ranking";
import { getRankingAPI } from "@/app/lib/api/ranking";
import { RankingProps } from "@/app/types/Ranking";

const page = async () => {
  let data: RankingProps; // 변수를 블록 외부에서 선언

  if (process.env.NODE_ENV === "production") {
    data = await getRankingAPI(); // 변수를 업데이트
  } else {
    data = {
      user1: {
        clearPoints: 100,
        attendancePoints: 100,
        totalPoints: 200,
      },
      user2: {
        clearPoints: 100,
        attendancePoints: 100,
        totalPoints: 200,
      },
      user3: {
        clearPoints: 100,
        attendancePoints: 100,
        totalPoints: 200,
      },
    };
  }

  return (
    <>
      <Ranking data={data} />
    </>
  );
};

export default page;
