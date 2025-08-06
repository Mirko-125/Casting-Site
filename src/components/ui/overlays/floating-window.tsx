import { useState, useEffect } from "react";
import Image from "next/image";
import x from "@/assets/svgs/exodus.svg";

interface FloatingWindowProps {
  onClose: () => void;
  children: React.ReactNode;
}

export const FloatingWindow = (props: FloatingWindowProps) => {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateIn(true), 0);
  }, []);

  const handleClose = () => {
    setAnimateIn(false);
    setTimeout(props.onClose, 400);
  };

  return (
    <div
      className="
        fixed
        w-[90vw] md:w-[85vw]
        max-h-[90vh] md:max-h-[85vh]
        bg-[#404660] border-4 border-[#2b3044] shadow-lg
        pt-14 overflow-y-auto z-50
      "
      style={{
        top: animateIn ? "50%" : "0%",
        left: animateIn ? "50%" : "0%",
        opacity: animateIn ? 1 : 0,
        transform: animateIn ? "translate(-50%, -50%)" : "translate(0, 0)",
        transition:
          "top 400ms ease-out, left 400ms ease-out, opacity 300ms ease, transform 400ms ease-out",
      }}
    >
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 w-6 h-6 cursor-pointer"
      >
        <Image src={x} alt="Close" width={24} height={24} />
      </button>
      {props.children}
    </div>
  );
};
