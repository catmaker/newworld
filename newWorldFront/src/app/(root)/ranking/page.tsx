import React from "react";
import Ranking from "./Ranking";
import { getRankingAPI } from "@/app/lib/api/ranking";
import { RankingProps } from "@/app/types/Ranking";
const page = async () => {
  const data: RankingProps = await getRankingAPI();
  return (
    <>
      <Ranking data={data} />
    </>
  );
};

export default page;
