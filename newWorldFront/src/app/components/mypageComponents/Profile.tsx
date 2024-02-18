import React from "react";
import Image from "next/image";
import styles from "@/app/(root)/mypage/mypage.module.scss";
import { MypageProps } from "@/app/types/mypage";
const Profile: React.FC<MypageProps> = ({ session }) => {
  const { name, id, nickname } = session;
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
          {session ? <div>{name}</div> : <div>loading...</div>}
        </div>
        <div>
          <div>Email</div>
          {session ? <div>{id}</div> : <div>loading...</div>}
        </div>
        <div>
          <div>Nickname</div>
          {session ? <div>{nickname}</div> : <div>loading...</div>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
