import React from "react";
import styles from "./mypage.module.scss";
import dummy from "./dummy.json";
import Image from "next/image";
const Mypage = () => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.left_layout}>
            <div className={styles.profile}>
              <div className={styles.profile_icon}>
                <div>InFo</div>
                <div>⋯</div>
              </div>
              <div className={styles.profile_image}>
                {dummy.users && dummy.users[0] ? (
                  <Image
                    src={dummy.users[0].profilePicture}
                    alt="Profile"
                    width={200}
                    height={200}
                  />
                ) : (
                  <div>No user data</div>
                )}
              </div>
              <div className={styles.profile_info}>
                <div className={styles.profile_name}>
                  <div>Name :</div>
                  {dummy.users && dummy.users[0] ? (
                    <div>
                      {dummy.users[0].name.first} {dummy.users[0].name.last}
                    </div>
                  ) : (
                    <div>No user data</div>
                  )}
                </div>
                <div className={styles.profile_email}>
                  <div>Email :</div>
                  {dummy.users && dummy.users[0] ? (
                    <div>{dummy.users[0].email}</div>
                  ) : (
                    <div>No user data</div>
                  )}
                </div>
                <div className={styles.profile_nickname}>
                  <div>Nickname :</div>
                  {dummy.users && dummy.users[0] ? (
                    <div>{dummy.users[0].nickname}</div>
                  ) : (
                    <div>No user data</div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.badge}></div>
          </div>
          <div className={styles.right_layout}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
