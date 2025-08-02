import Image from "next/image";

import { useState } from "react";

import SignIn from "@/components/ui/navbar/sliding-window/SignIn/sign-in";
import SignUp from "@/components/ui/navbar/sliding-window/SignUp/sign-up";
import x from "@/assets/svgs/exodus.svg";

interface SlidingWindowProps {
  ref: React.Ref<HTMLDivElement>;
  openCheck: boolean;
  onClose: () => void;
}
export const SlidingWindow = (props: SlidingWindowProps) => {
  const [isSignIn, toggleIsSignIn] = useState<boolean>(true);

  const styles: React.CSSProperties = {
    zIndex: 10,
    position: "fixed",
    top: 0,
    right: props.openCheck ? 0 : -350,
    width: 350,
    height: "100%",
    backgroundColor: "#222222",
    transition: "right 0.3s ease-in-out",
    overflowY: "auto",
  };

  return (
    <div ref={props.ref} style={styles}>
      <a
        onClick={props.onClose}
        className="absolute top-4 right-4 w-fit h-fit cursor-pointer"
      >
        <Image className="cursor-pointer w-7 h-7" src={x} alt="X" />
      </a>
      <div className="p-4">
        {isSignIn ? (
          <SignIn redirectionSwitch={() => toggleIsSignIn(false)} />
        ) : (
          <SignUp redirectionSwitch={() => toggleIsSignIn(true)} />
        )}
      </div>
    </div>
  );
};
