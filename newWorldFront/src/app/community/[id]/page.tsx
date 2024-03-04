import React from "react";
import Community from "./Community";
import { getPostAPI } from "@/app/lib/api/community";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import { MySession } from "@/app/types/Session";
import { redirect } from "next/navigation";
const page = async (props: any) => {
  const postId = props.params.id;
  const newObject = { postId: postId };
  const session = (await getServerSession(authOptions)) as MySession;
  if (session && session.user) {
    const sessions = session.user;
  } else {
    return redirect("/login");
  }
  const communityList = await getPostAPI(newObject);
  return <Community communityList={communityList}> </Community>;
};

export default page;
