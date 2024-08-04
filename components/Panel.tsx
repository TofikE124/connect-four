"use client";
import { usePanel } from "@/providers/PanelProvider";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
interface PanelProps {
  name: string;
  children?: ReactNode;
  className?: string;
  onClose?: () => void;
}

const Panel = ({
  children,
  name,
  className,
  onClose = () => {},
}: PanelProps) => {
  const { isPanelOpen, closePanel } = usePanel();

  const handleClosePanel = () => {
    onClose();
    closePanel(name);
  };

  return (
    <div
      className={`fixed z-[100] inset-0 flex items-center justify-center transition-all duration-300 ${
        isPanelOpen(name) ? "visible" : "invisible"
      }`}
    >
      <div
        className={twMerge(
          `relative z-30 bg-purple border-[3px] border-solid border-black shadow-[0px_10px_0px_0px_black] dark:bg-dark-grey px-10 sm:px-5 py-[50px] sm:py-[30px] rounded-[40px] lgmd:max-w-[480px] sm:max-w-[90%] sm:w-full transition-transform duration-300 ${
            isPanelOpen(name) ? "scale-100" : "scale-0"
          }`,
          className
        )}
      >
        {children}
      </div>
      <div
        className={`absolute inset-0 bg-black bg-opacity-50 transition-all duration-200 ${
          isPanelOpen(name) ? "opacity-100 visible " : "opacity-0 invisible"
        }`}
        onClick={handleClosePanel}
      ></div>
    </div>
  );
};

export default Panel;
