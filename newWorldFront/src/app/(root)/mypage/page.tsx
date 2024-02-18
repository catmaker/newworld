import React from "react";
import Mypage from "./Mypage";
import Header from "@/app/components/header/page";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { MySession } from "@/app/types/Session";

const page = async () => {
  const session = (await getServerSession(authOptions)) as MySession;

  if (session && session.user) {
    const { name, id, nickname } = session.user;
    console.log(name, id, nickname);
    return (
      <div>
        <Header></Header>
        <Mypage session={{ name, id, nickname }} />
      </div>
    );
  } else {
    return redirect("/login");
  }
};
export default page;
