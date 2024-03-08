// WelcomeMessage.tsx
import React from "react";
import styles from "@/app/assets/scss/section/_mypage.module.scss";
import Image from "next/image";
import { WelcomeMessageProps } from "@/app/types/mypage";
import { redirect } from "next/navigation";
import DaysSince from "@/app/components/daysSince/DaysSince";
const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ session }) => {
  let name, id, nickname, signupDate, puzzleCount, point;
  if (session) {
    ({ name, id, nickname, signupDate, puzzleCount, point } = session);
    console.log(name, id, nickname, signupDate, puzzleCount, point);
  } else {
    return redirect("/login");
  }

  return (
    <div className={styles.welcome_message}>
      <div className={styles.message}>
        {!session ? (
          <div className={styles.loading}>
            로딩중입니다. 잠시만 기다려주세요.
          </div>
        ) : (
          <div>
            <p>환영합니다 {name}님!</p>
            <p>저희가 처음 만난 날은 {signupDate} 입니다.</p>
            <p>
              처음 만난 날부터 지금까지 <DaysSince date={signupDate} />
              일이 지났습니다.
            </p>
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
          <p>해결한 문제 수 : {puzzleCount}</p>
          <p>획득한 포인트 : {point}</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
