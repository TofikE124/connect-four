"use client";
import Image from "next/image";
import PlayerTwo from "/public/images/player-two.svg";
import useGame from "@/hooks/useGame";
import { Player } from "@/providers/GameProvider";

const PlayerDetailsTwo = () => {
  const { playerTwoScore, playerNamesMap } = useGame();

  return (
    <div className="grid-in-playerTwo relative w-fit  mdsm:w-full h-fit  flex flex-col md:flex-row items-center justify-center mdsm:justify-between pt-12 pb-4 px-7 md:py-2 sm:py-2 md:pr-11 md:pl-5 sm:px-9 rounded-[20px] border-[3px] border-solid border-black bg-white text-black shadow-[0px_10px_0px_black]">
      <div className="absolute top-0 translate-y-[-50%] lg:left-[50%] lg:translate-x-[-50%] mdsm:top-[50%] mdsm:translate-y-[-50%] right-0 translate-x-[50%]">
        <Image src={PlayerTwo} width={54} height={60} alt="Player One" />
      </div>
      <h3 className="heading-s text-black">
        {playerNamesMap?.[Player.PLAYER_TWO]}
      </h3>
      <h2 className="heading-l text-black md:-order-1 ">{playerTwoScore}</h2>
    </div>
  );
};

export default PlayerDetailsTwo;
