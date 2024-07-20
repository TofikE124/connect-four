"use client";
import SmallButton from "@/components/SmallButton";
import Image from "next/image";
import React from "react";
import logo from "/public/images/logo.svg";
import { usePanel } from "@/providers/PanelProvider";
import { PANELS } from "@/constants/panels";
import useGame from "@/hooks/useGame";

const GameHeader = () => {
  const { pauseGame, restartGame } = useGame();
  const { openPanel } = usePanel();

  const handleMenuClick = () => {
    openPanel(PANELS.MENU_PANEL);
    pauseGame();
  };

  return (
    <div className="grid-in-header flex items-center justify-between gap-[80px] w-full">
      <SmallButton onClick={handleMenuClick}>Menu</SmallButton>
      <Image src={logo} width={52} height={52} alt="Logo icon" />
      <SmallButton onClick={restartGame}>Restart</SmallButton>
    </div>
  );
};

export default GameHeader;
