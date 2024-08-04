"use client";
import useGame from "@/hooks/useGame";
import Image from "next/image";
import React from "react";
import PlayerOne from "/public/images/player-one.svg";
import PlayerTwo from "/public/images/player-two.svg";
import { Player } from "@/app/types/Player";

interface PlayerDetailsProps {
  player: Player;
}

const PlayerDetails = ({ player }: PlayerDetailsProps) => {
  const { playerOneScore, playerTwoScore, playerNamesMap } = useGame();

  return (
    <div
      className={`relative w-fit  mdsm:w-full h-fit  flex flex-col md:flex-row items-center justify-center mdsm:justify-between pt-12 pb-4 px-7 md:py-2 sm:py-2 ${
        player == Player.PLAYER_ONE ? "md:pl-11 md:pr-5" : "md:pr-11 md:pl-5"
      } sm:px-2 rounded-[20px] border-[3px] border-solid border-black bg-white text-black shadow-[0px_10px_0px_black] ${
        player == Player.PLAYER_ONE ? "grid-in-playerOne" : "grid-in-playerTwo"
      }`}
    >
      <div
        className={`absolute top-0 translate-y-[-50%] lg:left-[50%] lg:translate-x-[-50%] mdsm:top-[50%] mdsm:translate-y-[-50%] ${
          player == Player.PLAYER_ONE
            ? "left-0 translate-x-[-50%]"
            : "right-0 translate-x-[50%]"
        } `}
      >
        <Image
          src={player == Player.PLAYER_ONE ? PlayerOne : PlayerTwo}
          className="lgmd:w-[54px] lgmd:h-[60px] sm:size-[40px]"
          alt="Player One"
        />
      </div>
      <h3 className="heading-s text-black">
        {
          playerNamesMap?.[
            player == Player.PLAYER_ONE ? Player.PLAYER_ONE : Player.PLAYER_TWO
          ]
        }
      </h3>
      <h2 className="heading-l text-black">
        {player == Player.PLAYER_ONE ? playerOneScore : playerTwoScore}
      </h2>
    </div>
  );
};

export default PlayerDetails;
