"use client";
import React from "react";
import styles from "./mypage.module.scss";
import dummy from "./dummy.json";
import dummy2 from "./dummy2.json";
import dummy3 from "./dummy3.json";
import Image from "next/image";
import { useState, useEffect } from "react";
import Pagenation from "@/components/pagenation/Pagenation";
import Profile from "./Profile";
import Badge from "./Badge";
import WelcomeMessage from "./WelcomeMessage";
import PrivacyControlBox from "./PrivacyControlBox";
import SelectedItem from "./SelectedItem";
const Mypage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState<
    {
      problemId: number;
      problemName: string;
      difficulty: string;
      clearDate: string;
    }[]
  >([]);
  const [days, setDays] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState("");
  const ITEMS_PER_PAGE = 10;
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const totalPages = Math.ceil(dummy3.clearedProblems.length / ITEMS_PER_PAGE);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      console.log("No file selected");
      return;
    }
    console.log(file.name);
  };

  useEffect(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    setCurrentItems(dummy3.clearedProblems.slice(start, end));
  }, [currentPage]);

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
            <Profile user={dummy.users && dummy.users[0]} />
            <Badge
              badges={dummy2.users && dummy2.users[0] && dummy2.users[0].badges}
            />
          </div>
          <div className={styles.right_layout}>
            <WelcomeMessage loading={loading} days={days} />
            <PrivacyControlBox
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />{" "}
            {/* PrivacyControlBox 컴포넌트를 사용 */}
            <div className={styles.infomation}>
              <SelectedItem
                selectedItem={selectedItem}
                dummy={dummy}
                dummy2={dummy2}
                handleFileChange={handleFileChange}
                currentItems={currentItems}
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageClick={handlePageClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
