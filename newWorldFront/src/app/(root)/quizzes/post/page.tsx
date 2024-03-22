import React from "react";
import Post from "./Post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import { MySession } from "@/app/types/Session";
const page = async () => {
  const session = (await getServerSession(authOptions)) as MySession;
  return <Post session={session} />;
};

export default page;
