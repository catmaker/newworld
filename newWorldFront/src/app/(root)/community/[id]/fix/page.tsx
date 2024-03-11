import React from "react";
import Post from "./updateCommunity";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import { MySession } from "@/app/types/Session";
import { getPostAPI } from "@/app/lib/api/community";
const page = async (props: any) => {
  const session = (await getServerSession(authOptions)) as MySession;
  const userNickName = session.user.nickname;
  const postId = props.params.id;

  const newObject = { postId: postId };

  console.log(newObject);
  console.log(session);
  return (
    <div>
      <Post userNickName={userNickName} postId={newObject} />
    </div>
  );
};

export default page;
