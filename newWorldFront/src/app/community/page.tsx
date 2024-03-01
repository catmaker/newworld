import React from "react";
import Community from "./Community";
import { getCommunityAPI } from "../lib/api/community";

const page = async () => {
  let data: any = [];
  let page = 0;

  while (true) {
    try {
      const res = await getCommunityAPI(page);
      data = data.concat(res.content);
      if (res.last) break; // 마지막 페이지에 도달하면 종료
      page++;
    } catch (error) {
      console.error(error);
      break;
    }
  }
  return <Community data={data} />;
};

export default page;
