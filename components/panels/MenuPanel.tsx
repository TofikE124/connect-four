"use client";
import { PANELS } from "@/constants/panels";
import useGame from "@/hooks/useGame";
import { usePanel } from "@/providers/PanelProvider";
import Link from "next/link";
import Button from "../Button";
import Panel from "../Panel";

const MenuPanel = () => {
  const { closePanel } = usePanel();
  const { continueGame, restartGame, pauseGame } = useGame();

  const handleContinuteGame = () => {
    closePanel(PANELS.MENU_PANEL);
    continueGame();
  };

  const handleRestartGame = () => {
    closePanel(PANELS.MENU_PANEL);
    restartGame();
  };

  const handleQuitGame = () => {
    closePanel(PANELS.MENU_PANEL);
  };

  return (
    <Panel name={PANELS.MENU_PANEL} onClose={continueGame}>
      <div className="text-center">
        <h2 className="heading-l text-white uppercase mb-11">Paused</h2>
        <div className="flex flex-col gap-[30px]">
          <Button onClick={handleContinuteGame}>Continue Game</Button>
          <Button onClick={handleRestartGame}>Restart</Button>
          <Link href="/" onClick={handleQuitGame}>
            <Button color="red">Quit Game</Button>
          </Link>
        </div>
      </div>
    </Panel>
  );
};

export default MenuPanel;
