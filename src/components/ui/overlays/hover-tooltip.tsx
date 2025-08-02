"use client";

import {
  useState,
  cloneElement,
  isValidElement,
  ReactElement,
  HTMLAttributes,
} from "react";

interface TooltipData {
  visible: boolean;
  x: number;
  y: number;
  text: string;
}

interface HoverTooltipProps {
  children: ReactElement<HTMLAttributes<HTMLElement>>;
}

export const HoverTooltip = ({ children }: HoverTooltipProps) => {
  const [tooltip, setTooltip] = useState<TooltipData>({
    visible: false,
    x: 0,
    y: 0,
    text: "",
  });

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const span = e.currentTarget.querySelector("span");
    setTooltip({
      visible: true,
      x: e.clientX + 10,
      y: e.clientY + 10,
      text: span?.textContent ?? "",
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    setTooltip((prev) => ({
      ...prev,
      x: e.clientX + 10,
      y: e.clientY + 10,
    }));
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, x: 0, y: 0, text: "" });
  };

  return (
    <>
      {isValidElement(children) &&
        cloneElement(children, {
          onMouseEnter: handleMouseEnter,
          onMouseMove: handleMouseMove,
          onMouseLeave: handleMouseLeave,
        })}
      {tooltip.visible && (
        <div
          className="fixed bg-[black]/80 text-[#A0BFA0] text-5xl sm:text-base px-6 py-4 pointer-events-none z-50 whitespace-pre-line shadow-lg border border-[#333333]"
          style={{
            top: tooltip.y,
            left: tooltip.x,
            maxWidth: "600px",
            width: "max-content",
          }}
        >
          {tooltip.text}
        </div>
      )}
    </>
  );
};
