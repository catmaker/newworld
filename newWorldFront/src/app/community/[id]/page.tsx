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
  const nickname = session.user.nickname;
  if (session && session.user) {
    const sessions = session.user.nickname;
  } else {
    return redirect("/login");
  }
  const communityList = await getPostAPI(newObject);
  console.log(communityList);
  return (
    <Community
      communityList={communityList}
      userNickname={nickname}
    ></Community>
  );
};

export default page;
