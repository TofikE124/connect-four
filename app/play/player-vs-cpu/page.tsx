import Panels from "@/components/panels/Panels";
import GameProvider from "@/providers/GameProvider";
import GameGrid from "../components/GameGrid";
import GameHeader from "../components/GameHeader";
import PlayerDetailsOne from "../components/PlayerDetailsOne";
import PlayerDetailsTwo from "../components/PlayerDetailsTwo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect 4 | Player vs Player",
  description: "Connect 4 Player vs CPU Mode",
};

const page = () => {
  return (
    <GameProvider isCpu={true}>
      <Panels></Panels>
      <div className="w-full h-screen bg-purple py-[50px]">
        <div className="max-w-[80rem] mx-auto px-[50px] flex justify-center">
          <div className="grid lg:gap-[50px] gap-[40px] grid-areas-gameLayoutLarge grid-cols-gameLayoutLarge mdsm:grid-areas-gameLayoutTablet mdsm:grid-cols-gameLayoutTablet w-full">
            <PlayerDetailsOne />
            <GameHeader></GameHeader>
            <GameGrid></GameGrid>
            <PlayerDetailsTwo />
          </div>
        </div>
      </div>
    </GameProvider>
  );
};

export default page;
