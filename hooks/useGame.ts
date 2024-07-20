"use client";
import { GameContext } from "@/providers/GameProvider";
import { useContext } from "react";

const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw Error("Context can only be used inside of provider");
  return context;
};

export default useGame;
