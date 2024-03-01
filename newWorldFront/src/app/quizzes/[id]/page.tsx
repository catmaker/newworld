import React from "react";
import Quiz from "./Quiz";
const page = (props: any) => {
  console.log(props.params);
  const { id } = props.params;
  return <Quiz></Quiz>;
};

export default page;
