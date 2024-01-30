// WelcomeMessage.tsx
import React from "react";
import dummy2 from "./dummy2.json";
import styles from "./mypage.module.scss";
import Image from "next/image";
interface WelcomeMessageProps {
  loading: boolean;
  days: number;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ loading, days }) => {
  return (
    <div className={styles.welcome_message}>
      <div className={styles.message}>
        {loading ? (
          <div className={styles.loading}>
            로딩중입니다. 잠시만 기다려주세요.
          </div>
        ) : (
          <div>
            <p>환영합니다 {dummy2.users[0].name}님!</p>
            <p>저희가 처음 만난 날은 {dummy2.users[0].signUpDate} 입니다.</p>
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
  );
};

export default WelcomeMessage;
