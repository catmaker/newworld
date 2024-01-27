import React from "react";
import styles from "./footer.module.scss";
import Image from "next/image";
import Link from "next/link";
const Footer = () => {
  return (
    <div className={styles.background}>
      <div className={styles.sns_img_box}>
        <div>
          <a href="http://facebook.com" target="_blank">
            <Image
              src={"img/sns_icon/facebook_w.svg"}
              alt="facebook_icon"
              width={20}
              height={20}
            />
          </a>
        </div>
        <div>
          <a href="http://instagram.com" target="_blank">
            <Image
              src={"img/sns_icon/instagram_w.svg"}
              alt="instagram_icon"
              width={20}
              height={20}
            />
          </a>
        </div>
        <div>
          <a href="http://twitter.com" target="_blank">
            <Image
              src={"img/sns_icon/twitter_w.svg"}
              alt="twitter_icon"
              width={20}
              height={20}
            />
          </a>
        </div>
      </div>
      <div className={styles.footer_Link_Section}>
        <div className={styles.info_Section}>
          <Link href="/info">Info</Link>
        </div>
        <div className={styles.support_Section}>
          <Link href="/support">Support</Link>
        </div>
        <div className={styles.marketing_Section}>
          <Link href="/marketing">Marketing</Link>
        </div>
      </div>
      <div className={styles.policy_Links}>
        <Link href="/terms-of-use">
          <div>Terms of Use</div>
        </Link>
        <Link href="/policy">
          <div>Privacy Policy</div>
        </Link>
      </div>
      <div className={styles.copyright_Info}>@2024-01-07</div>
    </div>
  );
};

export default Footer;
