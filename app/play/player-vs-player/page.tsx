import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-screen bg-purple py-[50px]">
      <div className="max-w-[65rem] mx-auto px-[50px] flex justify-center">
        <div className="grid grid-cols-[max-content_1fr_max-content] gap-[60px] w-full">
          <PlayerDetails player={Player.PLAYER_ONE} score={0}></PlayerDetails>
          <div className="w-[90%] max-w-[630px]"></div>
          <PlayerDetails player={Player.PLAYER_TWO} score={0}></PlayerDetails>
        </div>
      </div>
    </div>
  );
};

enum Player {
  PLAYER_ONE = "Player 1",
  PLAYER_TWO = "Player 2",
}

interface PlayerDetailsProps {
  player: Player;
  score: number;
}

import PlayerOne from "/public/images/player-one.svg";
import PlayerTwo from "/public/images/player-two.svg";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const PlayerDetails = ({ player, score }: PlayerDetailsProps) => {
  const PlayerImageMap: Record<Player, StaticImport> = {
    "Player 1": PlayerOne,
    "Player 2": PlayerTwo,
  };

  return (
    <div className="relative flex flex-col items-center justify-center pt-12 pb-4 px-7 rounded-[20px] border-[3px] border-solid border-black bg-white text-black shadow-[0px_10px_0px_black] w-fit">
      <div className="absolute top-0 translate-y-[-50%]">
        <Image
          src={PlayerImageMap[player]}
          width={54}
          height={60}
          alt="Player One"
        />
      </div>
      <h3 className="heading-s text-black">{player}</h3>
      <h2 className="heading-l text-black">{score}</h2>
    </div>
  );
};

export default page;
