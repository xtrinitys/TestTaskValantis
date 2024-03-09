import React from "react";
import cl from "./HomeBtn.module.css";

interface HomeBtnProps {
  onClick: () => void;
  children?: React.ReactNode;
}

const HomeBtn = ({ onClick, children }: HomeBtnProps) => {
  return (
    <button onClick={onClick} className={cl.homeBtn}>
      {children}
    </button>
  );
};

export default HomeBtn;
