import React, { useEffect, useState } from "react";
import cl from "./ScrollToTopBtn.module.css";

const ScrollToTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 240) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = (event: React.MouseEvent) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      style={{
        opacity: isVisible ? "1" : "0",
        pointerEvents: isVisible ? "auto" : "none",
      }}
      className={cl.scrollToTopBtn}
      onClick={scrollToTop}
    >
      <i className="ri-arrow-up-fill"></i>
    </button>
  );
};

export default ScrollToTopBtn;
