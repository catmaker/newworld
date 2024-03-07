import React from "react";
import Header from "@/app/components/header/page";
import Post from "./Post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import { MySession } from "@/app/types/Session";
const page = async () => {
  const session = (await getServerSession(authOptions)) as MySession;
  return (
    <div>
      <Header />
      <Post session={session} />
    </div>
  );
};

export default page;
