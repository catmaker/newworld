import Link from "next/link";
import styles from "@/components/main/intro.module.scss"; // CSS 모듈을 import합니다. 필요에 따라 경로를 수정하세요.

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.img_box}>
        <img src="/img/intrologo.svg" alt="" />
      </div>
      <div className={styles.ul_box}>
        <div className={styles.flex}>
          <Link href={`/`}>
            <div className={styles.flex_column}>
              <div className={styles.text}>홈</div>
              <div className={styles.text_en}>HOME</div>
            </div>
          </Link>
          <Link href={`/labyrinth`}>
            <div className={styles.flex_column}>
              <div className={styles.text}>미궁</div>
              <div className={styles.text_en}>LABYRINTH</div>
            </div>
          </Link>
          <Link href={`/ranking`}>
            <div className={styles.flex_column}>
              <div className={styles.text}>랭킹</div>
              <div className={styles.text_en}>RANKING</div>
            </div>
          </Link>
          <Link href={`/community`}>
            <div className={styles.flex_column}>
              <div className={styles.text}>커뮤니티</div>
              <div className={styles.text_en}>COMMUNITY</div>
            </div>
          </Link>
          <Link href={`/newworld`}>
            <div className={styles.flex_column}>
              <div className={styles.text}>신세계</div>
              <div className={styles.text_en}>NEWWORLD</div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
