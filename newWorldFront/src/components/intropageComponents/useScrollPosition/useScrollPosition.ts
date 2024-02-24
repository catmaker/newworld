// useScrollToContainer.ts
import { useEffect, useState } from "react";
import { scroller } from "react-scroll";

export const useScrollToContainer = () => {
  const [key, setKey] = useState(0);
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    let scrollPosition = 0;

    const handleScroll = (e: any) => {
      setKey((prevKey) => prevKey + 1);
      if (e.deltaY > 0) {
        scrollPosition += 1;
      } else if (e.deltaY < 0) {
        scrollPosition -= 1;
      }

      scrollPosition = Math.max(0, scrollPosition); // scrollPosition이 0보다 작아지지 않도록 합니다.

      const container = ["container1", "container2", "container3"][
        scrollPosition
      ];
      scroller.scrollTo(container, {
        duration: 150,
        delay: 0,
        smooth: "easeInOutQuart",
      });
      if (container === "container3") {
        setStartTyping(true);
      }
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  return { key, startTyping };
};
