// Badge.tsx
import React from "react";
import Image from "next/image";
import styles from "@/app/(root)/mypage/mypage.module.scss";
interface Badge {
  name: string;
  level: number;
  description: string;
  image: string;
}
interface BadgeProps {
  badges: Badge[];
}

const Badge: React.FC<BadgeProps> = ({ badges }) => {
  return (
    <div className={styles.badge}>
      <div className={styles.badge_container}>
        <div className={styles.badge_title}>Badge</div>
        <div className={styles.my_badge}>
          {badges &&
            badges.map((badge, index) => (
              <Image
                key={index}
                src={badge.image}
                alt={`${badge.name} badge`}
                width={35}
                height={35}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Badge;
