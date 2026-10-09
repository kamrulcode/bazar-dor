"use client";

const DatePage = ({ color }: { color: string }) => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return <div className={`text-sm ${color}`}>{date}</div>;
};

export default DatePage;
