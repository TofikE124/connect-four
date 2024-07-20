"use client";
import useGame from "@/hooks/useGame";
import React from "react";
import PlayerOne from "/public/images/player-one.svg";
import Image from "next/image";

const PlayerDetailsOne = () => {
  const { playerOneScore } = useGame();

  return (
    <div className="grid-in-playerOne relative w-fit  mdsm:w-full h-fit  flex flex-col md:flex-row items-center justify-center mdsm:justify-between pt-12 pb-4 px-7 md:py-9 sm:py-2 md:pl-11 md:pr-5 sm:px-9 rounded-[20px] border-[3px] border-solid border-black bg-white text-black shadow-[0px_10px_0px_black]">
      <div className="absolute top-0 translate-y-[-50%] lg:left-[50%] lg:translate-x-[-50%] mdsm:top-[50%] mdsm:translate-y-[-50%] left-0 translate-x-[-50%]">
        <Image src={PlayerOne} width={54} height={60} alt="Player One" />
      </div>
      <h3 className="heading-s text-black">Player 1</h3>
      <h2 className="heading-l text-black">{playerOneScore}</h2>
    </div>
  );
};

export default PlayerDetailsOne;
