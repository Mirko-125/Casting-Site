import { useDraggable, useDndMonitor } from "@dnd-kit/core";
import { CSS, type Transform } from "@dnd-kit/utilities";
import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import x from "@/assets/svgs/exodus.svg";

interface FloatingWindowProps {
  id: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const FloatingWindow = (props: FloatingWindowProps) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [animateIn, setAnimateIn] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);

  const windowWidth = window.innerWidth * 0.85;
  const windowHeight = window.innerHeight * 0.85;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });

  useEffect(() => {
    const onMountCenter = () => {
      const centerX = (window.innerWidth - windowWidth) / 2;
      const centerY = (window.innerHeight - windowHeight) / 2;
      setPosition({ x: centerX, y: centerY });
      setAnimateIn(true);
    };
    setTimeout(onMountCenter, 0);

    const resizeListener = () => {
      const centerX = (window.innerWidth - windowWidth) / 2;
      const centerY = (window.innerHeight - windowHeight) / 2;
      setPosition({ x: centerX, y: centerY });
    };
    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  }, [windowHeight, windowWidth]);

  const clampPosition = (x: number, y: number) => {
    const minX = 0;
    const minY = 0;
    const maxX = window.innerWidth - windowWidth;
    const maxY = window.innerHeight - windowHeight;
    return {
      x: Math.min(Math.max(x, minX), maxX),
      y: Math.min(Math.max(y, minY), maxY),
    };
  };

  useDndMonitor({
    onDragEnd(event) {
      const { delta } = event;
      setPosition((prev) => {
        const newPos = {
          x: prev.x + (delta?.x || 0),
          y: prev.y + (delta?.y || 0),
        };
        return clampPosition(newPos.x, newPos.y);
      });
    },
  });

  const combinedPosition = transform
    ? { x: position.x + transform.x, y: position.y + transform.y }
    : position;

  const clampedPosition = clampPosition(combinedPosition.x, combinedPosition.y);

  const style = useMemo(() => {
    return {
      width: windowWidth,
      height: windowHeight,
      transform: CSS.Translate.toString(clampedPosition as Transform),
      position: "absolute" as const,
      zIndex: 50,
      top: 0,
      left: 0,
      willChange: "transform",
      opacity: animateIn ? 1 : 0,
      transition: "transform 0.3s ease, opacity 0.3s ease",
    };
  }, [clampedPosition, animateIn, windowWidth, windowHeight]);

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        windowRef.current = node;
      }}
      {...listeners}
      {...attributes}
      style={style}
      className="bg-[#404660] border-4 border-[#2b3044] shadow-lg pt-14 relative"
    >
      <a
        onClick={props.onClose}
        className="absolute top-4 right-4 w-fit h-fit cursor-pointer"
      >
        <Image className="cursor-pointer w-6 h-6" src={x} alt="X" />
      </a>
      {props.children}
    </div>
  );
};
