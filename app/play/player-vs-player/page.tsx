import Panels from "@/components/panels/Panels";
import GameGrid from "../components/GameGrid";
import GameHeader from "../components/GameHeader";
import PlayerDetailsOne from "../components/PlayerDetailsOne";
import PlayerDetailsTwo from "../components/PlayerDetailsTwo";
import GameProvider from "@/providers/GameProvider";
import { Metadata } from "next";
import PlayerDetails from "../components/PlayerDetails";

export const metadata: Metadata = {
  title: "Connect 4 | Player vs Player",
  description: "Connect 4 Player vs Player Mode",
};

const page = () => {
  return (
    <GameProvider isCpu={false}>
      <Panels></Panels>
      <div className="w-screen h-screen bg-purple py-[50px] sm:px-6 lgmd:px-[50px]">
        <div className="lgmd:max-w-[80rem] sm:w-full mx-auto flex justify-center">
          <div className="grid lg:gap-[50px] gap-[40px] grid-areas-gameLayoutLarge grid-cols-gameLayoutLarge mdsm:grid-areas-gameLayoutTablet mdsm:grid-cols-gameLayoutTablet w-full">
            <PlayerDetails player="player 1"></PlayerDetails>
            <GameHeader></GameHeader>
            <GameGrid></GameGrid>
            <PlayerDetails player="player 2"></PlayerDetails>
          </div>
        </div>
      </div>
    </GameProvider>
  );
};

export default page;
