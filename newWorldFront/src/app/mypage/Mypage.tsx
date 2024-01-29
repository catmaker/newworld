"use client";
import React from "react";
import styles from "./mypage.module.scss";
import dummy from "./dummy.json";
import dummy2 from "./dummy2.json";
import Image from "next/image";
import { useState, useEffect } from "react";

const Mypage = () => {
  const [days, setDays] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState("");
  useEffect(() => {
    const signUp = new Date(dummy2.users[0].signUpDate);
    const current = new Date("2024-01-30");

    const differenceInTime = current.getTime() - signUp.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    setDays(Math.ceil(differenceInDays));
    setLoading(false);
  }, []);
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
                <div>
                  <div>Name</div>
                  {dummy.users && dummy.users[0] ? (
                    <div>
                      {dummy.users[0].name.first} {dummy.users[0].name.last}
                    </div>
                  ) : (
                    <div>No user data</div>
                  )}
                </div>
                <div>
                  <div>Email</div>
                  {dummy.users && dummy.users[0] ? (
                    <div>{dummy.users[0].email}</div>
                  ) : (
                    <div>No user data</div>
                  )}
                </div>
                <div>
                  <div>Nickname</div>
                  {dummy.users && dummy.users[0] ? (
                    <div>{dummy.users[0].nickname}</div>
                  ) : (
                    <div>No user data</div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.badge}>
              <div className={styles.badge_container}>
                <div className={styles.badge_title}>Badge</div>
                <div className={styles.my_badge}>
                  {dummy2.users &&
                    dummy2.users[0] &&
                    dummy2.users[0].badges &&
                    dummy2.users[0].badges.map((badge, index) => (
                      <Image
                        key={index}
                        src={badge.image}
                        alt="Badge"
                        width={30}
                        height={30}
                        title={badge.description}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.right_layout}>
            <div className={styles.welcome_message}>
              <div className={styles.message}>
                {loading ? (
                  <div className={styles.loading}>
                    로딩중입니다. 잠시만 기다려주세요.
                  </div>
                ) : (
                  <div>
                    <p>
                      환영합니다 <span>{dummy2.users[0].name}</span> 님!
                    </p>
                    <p>
                      저희가 처음 만난 날은 {dummy2.users[0].signUpDate} 입니다.
                    </p>
                    <p>처음 만난 날부터 지금까지 {days}일이 지났습니다.</p>
                  </div>
                )}
                <Image
                  src={"/img/medal/medal1.svg"}
                  width={20}
                  height={20}
                  alt="image"
                  title="1000 days"
                ></Image>
              </div>
              <div className={styles.point_section}>
                <div>
                  <p>해결한 문제 수 : {dummy2.users[0].clear}</p>
                  <p>획득한 포인트 : {dummy2.users[0].point}</p>
                </div>
              </div>
            </div>
            <div className={styles.privacy_control_box}>
              <div
                className={`${styles.privacy_control_box_item} ${
                  selectedItem === "개인정보 관리" ? styles.selected : ""
                }`}
                onClick={() => setSelectedItem("개인정보 관리")}
              >
                개인정보 관리
              </div>
              <div
                className={`${styles.privacy_control_box_item} ${
                  selectedItem === "프로필 관리" ? styles.selected : ""
                }`}
                onClick={() => setSelectedItem("프로필 관리")}
              >
                프로필 관리
              </div>
              <div
                className={`${styles.privacy_control_box_item} ${
                  selectedItem === "클리어 퀴즈" ? styles.selected : ""
                }`}
                onClick={() => setSelectedItem("클리어 퀴즈")}
              >
                클리어 퀴즈
              </div>
              <div
                className={`${styles.privacy_control_box_item} ${
                  selectedItem === "뱃지" ? styles.selected : ""
                }`}
                onClick={() => setSelectedItem("뱃지")}
              >
                뱃지
              </div>
            </div>
            <div className={styles.infomation}>
              {selectedItem === "개인정보 관리" && <div>개인정보관리</div>}
              {selectedItem === "프로필 관리" && <div>프로필관리</div>}
              {selectedItem === "클리어 퀴즈" && <div>클리어퀴즈</div>}
              {selectedItem === "뱃지" && <div>뱃지</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
