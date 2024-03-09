import React from "react";
import cl from "./HomeBtn.module.css";

interface HomeBtnProps {
  onClick: () => void;
  children?: React.ReactNode;
}

const HomeBtn: React.FC<HomeBtnProps> = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className={cl.homeBtn}>
      {children}
    </button>
  );
};

export default HomeBtn;
