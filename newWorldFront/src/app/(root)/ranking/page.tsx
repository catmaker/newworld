import React from "react";
import Ranking from "./Ranking";
import { getRankingAPI } from "@/app/lib/api/ranking";
import { RankingProps } from "@/app/types/Ranking";

const page = async () => {
  const data = await getRankingAPI(); // 변수를 업데이트
  console.log(data);
  return (
    <>
      <Ranking total={data} />
    </>
  );
};

export default page;
