"use client";

const DatePage = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return <div className="text-xs">{date}</div>;
};

export default DatePage;
