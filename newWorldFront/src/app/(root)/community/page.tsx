import React from "react";
import Community from "./Community";
import { getCommunityAPI } from "../../lib/api/community";

const page = async () => {
  let data: any = [];
  let page = 0;

  const res = await getCommunityAPI(page);

  return <Community data={res} />;
};

export default page;
