import React from "react";
import Ranking from "./Ranking";
import { getTotalRankingAPI } from "@/app/lib/api/ranking";
import { RankingProps } from "@/app/types/Ranking";

const page = async () => {
  const data = await getTotalRankingAPI(); // 변수를 업데이트
  return (
    <>
      <Ranking total={data} />
    </>
  );
};

export default page;
