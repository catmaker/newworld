import React from "react";
import Image from "next/image";
import styles from "@/app/(root)/mypage/mypage.module.scss";
import { User } from "next-auth";
import { Users } from "@/app/types/User";
import { useSession } from "next-auth/react";
const Profile: React.FC = () => {
  const { data: session } = useSession();
  return (
    <div className={styles.profile}>
      <div className={styles.profile_icon}></div>
      <div className={styles.profile_image}>
        {/* {user ? (
          <Image
            src={user.profilePicture}
            alt="Profile"
            width={200}
            height={200}
          />
        ) : (
          <div>No user data</div>
        )} */}
      </div>
      <div className={styles.profile_info}>
        <div>
          <div>Name</div>
          {session?.user ? (
            <div>{(session.user as Users).name}</div>
          ) : (
            <div>loading...</div>
          )}
        </div>
        <div>
          <div>Email</div>
          {session?.user ? (
            <div>{(session.user as Users).id}</div>
          ) : (
            <div>loading...</div>
          )}
        </div>
        <div>
          <div>Nickname</div>
          {session?.user ? (
            <div>{(session.user as Users).nickname}</div>
          ) : (
            <div>loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
