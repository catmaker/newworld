import React from "react";

type DaysSinceProps = {
  date: string;
};

const DaysSince: React.FC<DaysSinceProps> = ({ date }) => {
  const dateObj = new Date(date);
  const currentDate = new Date();
  const timeDiff = Math.abs(currentDate.getTime() - dateObj.getTime());
  const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return <>{days}</>;
};

export default DaysSince;
