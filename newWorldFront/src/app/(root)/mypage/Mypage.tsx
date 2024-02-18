"use client";
import React from "react";
import styles from "./mypage.module.scss";
import dummy from "./dummy.json";
import dummy2 from "./dummy2.json";
import dummy3 from "./dummy3.json";
import { useState, useEffect } from "react";
import Profile from "@/app/components/mypageComponents/Profile";
import Badge from "@/app/components/mypageComponents/Badge";
import WelcomeMessage from "@/app/components/mypageComponents/WelcomeMessage";
import PrivacyControlBox from "@/app/components/mypageComponents/PrivacyControlBox";
import SelectedItem from "@/app/components/mypageComponents/SelectedItem";
import { MypageProps } from "@/app/types/Mypage";

const Mypage: React.FC<MypageProps> = ({ session }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState<
    {
      problemId: number;
      problemName: string;
      difficulty: string;
      clearDate: string;
    }[]
  >([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [days, setDays] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState("");
  const ITEMS_PER_PAGE = 10;
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth <= 700 ? 5 : 10);
    };

    window.addEventListener("resize", updateItemsPerPage);
    updateItemsPerPage();

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // ...
  const totalPages = Math.ceil(dummy3.clearedProblems.length / itemsPerPage);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      console.log("No file selected");
      return;
    }
    console.log(file.name);
  };

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setCurrentItems(dummy3.clearedProblems.slice(start, end));
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    const signUp = new Date(dummy2.users[0].signUpDate);
    const current = new Date("2024-01-30");

    const differenceInTime = current.getTime() - signUp.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    setDays(Math.ceil(differenceInDays));
    setLoading(false);
  }, []);
  const fetchData = async () => {
    const res = await fetch("/getUserProfile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.left_layout}>
            <Profile session={session} />
            <Badge
              badges={dummy2.users && dummy2.users[0] && dummy2.users[0].badges}
            />
          </div>
          <div className={styles.right_layout}>
            <WelcomeMessage session={session} />
            <PrivacyControlBox
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
            <div className={styles.infomation}>
              <SelectedItem
                session={session}
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
