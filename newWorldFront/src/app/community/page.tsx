import React from "react";
import Community from "./Community";
import { getCommunityAPI } from "../lib/api/community";
const page = async () => {
  const data = await getCommunityAPI();
  console.log(data);

  return <Community data={data} />;
};

export default page;
