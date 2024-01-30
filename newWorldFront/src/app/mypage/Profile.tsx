import React from "react";
import Image from "next/image";
import styles from "./mypage.module.scss";
interface User {
  profilePicture: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  nickname: string;
}

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className={styles.profile}>
      <div className={styles.profile_icon}>
        <div>InFo</div>
        <div>⋯</div>
      </div>
      <div className={styles.profile_image}>
        {user ? (
          <Image
            src={user.profilePicture}
            alt="Profile"
            width={200}
            height={200}
          />
        ) : (
          <div>No user data</div>
        )}
      </div>
      <div className={styles.profile_info}>
        <div>
          <div>Name</div>
          {user ? (
            <div>
              {user.name.first} {user.name.last}
            </div>
          ) : (
            <div>No user data</div>
          )}
        </div>
        <div>
          <div>Email</div>
          {user ? <div>{user.email}</div> : <div>No user data</div>}
        </div>
        <div>
          <div>Nickname</div>
          {user ? <div>{user.nickname}</div> : <div>No user data</div>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
