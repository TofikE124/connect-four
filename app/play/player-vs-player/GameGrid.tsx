"use client";
import useGame from "@/hooks/useGame";
import { Player } from "@/providers/GameProvider";
import { motion, stagger, useAnimate } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MarkerRed from "/public/images/marker-red.svg";
import MarkerYellow from "/public/images/marker-yellow.svg";
import SmallButton from "@/components/SmallButton";

const GameGrid = () => {
  const {
    chooseDisc,
    mostBottomEmpty,
    gameResult: { gameOver },
  } = useGame();
  const [highLightedCol, setClosestCol] = useState<number | null>(null);

  const scope = useAnimateDiscs();

  const handlePointerOver = (e: React.PointerEvent) => {
    if (gameOver) return;
    const { closestTop, col } = getClosestDiscAtTop(e);
    setClosestCol(col);
  };

  const handleClick = (e: any) => {
    const { closestTop, col } = getClosestDiscAtTop(e);
    if (col == null) return;
    const row = mostBottomEmpty(col);
    if (row == -1) return;

    chooseDisc(row, col);
  };

  const getAllDiscs = () => {
    return Array.from(document.querySelectorAll("[data-disc]"));
  };

  const getClosestDiscAtTop = (e: React.PointerEvent) => {
    const DISTANCE_OFFSET = 50;
    const discs = getAllDiscs();

    const closest = discs.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        let offset = e.clientX - (box.left + DISTANCE_OFFSET);
        if (offset < 0 && offset > closest.offset)
          return { offset, element: child };
        return closest;
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: discs[discs.length - 1],
      }
    );

    const el = closest.element as HTMLDivElement;
    if (!el) return { closestTop: null, col: null };
    const colNumber = el?.dataset.col;

    const colEl = document.querySelector(
      `[data-col="${colNumber}"][data-row="0"]`
    );
    return { closestTop: colEl, col: Number(colNumber) };
  };

  return (
    <div
      onPointerMove={(e) => handlePointerOver(e)}
      onPointerLeave={() => setClosestCol(null)}
      onClick={(e) => handleClick(e)}
      className="relative grid-in-chart lgmd:mx-auto size-full"
    >
      <div
        ref={scope}
        className="relative min-h-[550px] z-20 size-full bg-white rounded-[25px] flex flex-col justify-center gap-6 p-5 pb-[60px] select-none"
      >
        <Discs highlightedCol={highLightedCol} key={gameOver ? 1 : 0}></Discs>
        {gameOver ? <GameResult></GameResult> : <TurnCounter></TurnCounter>}
      </div>
      <TurnBackground></TurnBackground>
    </div>
  );
};

interface DiscsProps {
  highlightedCol: number | null;
}

const Discs = ({ highlightedCol }: DiscsProps) => {
  const {
    grid,
    mostBottomEmpty,
    playerTurn,
    gameResult: { gameOver, winningDiscs },
  } = useGame();
  const isHighligted = (row: number, col: number) => {
    return (
      highlightedCol != null &&
      mostBottomEmpty(highlightedCol) == row &&
      highlightedCol == col
    );
  };

  const isWinningCard = (index: number) => {
    return winningDiscs.some((card) => card.index == index);
  };

  const isMarker = (row: number, col: number) => {
    return row == 0 && col == highlightedCol;
  };

  const PlayerColorMap: Record<Player, string> = {
    [Player.PLAYER_ONE]: "bg-red shadow-disc",
    [Player.PLAYER_TWO]: "bg-yellow shadow-disc",
  };

  const PlayerHighlightrMap: Record<Player, string> = {
    [Player.PLAYER_ONE]: "bg-red animate-pulse-fast duration-100 shadow-disc",
    [Player.PLAYER_TWO]:
      "bg-yellow animate-pulse-fast duration-100 shadow-disc",
  };

  return grid.map((row, index) => {
    // reverse the rows so the animation starts from bottom
    const i = 5 - index;
    return (
      <div
        key={index}
        className="grid grid-cols-7 place-items-center"
        style={{ order: i }}
      >
        {row.map((el, j) => {
          const { player, index } = grid[i][j];
          return (
            <div
              data-disc
              data-row={5 - i}
              data-col={j}
              key={index}
              className={`relative ${
                isHighligted(i, j) && !gameOver
                  ? PlayerHighlightrMap[playerTurn]
                  : player
                  ? PlayerColorMap[player]
                  : "bg-purple shadow-disc-empty"
              } rounded-full w-full aspect-square mdsm:w-[calc(25px+4.5vw)] mdsm:max-w-[45px] lg:max-w-[70px] border-[3px] border-solid border-black grid place-items-center text-white p-[8px]`}
            >
              {isMarker(i, j) ? <Marker></Marker> : null}
              <WinningCardMarker key={index} visible={isWinningCard(index)} />
            </div>
          );
        })}
      </div>
    );
  });
};

const TurnCounter = () => {
  const { playerTurn, timeLeft } = useGame();

  return (
    <div
      className="absolute text-center z-20 pointer-events-none sm:bottom-[70px] md:bottom-[95px] lg:bottom-[50px] translate-y-[100%] w-[197px] h-[165px] grid place-content-center left-[50%] translate-x-[-50%]"
      style={{
        backgroundImage: `url(${
          playerTurn == Player.PLAYER_ONE
            ? "/images/turn-background-red.svg"
            : "/images/turn-background-yellow.svg"
        })`,
      }}
    >
      <h3 className="heading-xs uppercase">{playerTurn}&#39;s Turn</h3>
      <h2 className="heading-l">{timeLeft}s</h2>
    </div>
  );
};

const GameResult = () => {
  const {
    gameResult: { winner },
    playAgain,
  } = useGame();

  return (
    <motion.div
      initial={{ scale: 0, translate: "-50% 100%" }}
      animate={{ scale: 1, translate: "-50% 100%" }}
      transition={{ duration: 0.4 }}
      className="absolute py-4 px-[75px] origin-center border border-solid rounded-[20px] shadow-[0px_10px_0px_0px_black] border-black bg-white text-center sm:bottom-[75px] md:bottom-[95px] lg:bottom-[40px] grid place-content-center left-[50%] z-50"
    >
      {winner ? <h3 className="heading-xs uppercase">{winner}</h3> : null}
      <h2 className="heading-l uppercase">{winner ? "Winner" : "Draw"}</h2>
      <SmallButton onClick={playAgain}>Play again</SmallButton>
    </motion.div>
  );
};

const TurnBackground = () => {
  const {
    gameResult: { gameOver, winner },
  } = useGame();

  const winColorMap: Record<Player, string> = {
    "Player 1": "bg-red",
    "Player 2": "bg-yellow",
  };

  return (
    <>
      <div
        className="absolute pointer-events-none z-10 bottom-[40px] left-[50%] w-screen h-[1000px] bg-dark-purple rounded-t-[60px]"
        style={{ translate: "-50% 100%" }}
      ></div>
      {gameOver ? (
        <motion.div
          className={`absolute pointer-events-none z-10 bottom-[40px] left-[50%] w-screen h-[1000px] rounded-t-[60px] ${
            winColorMap[winner!]
          }`}
          style={{ translate: "-50% 100%" }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      ) : null}
    </>
  );
};

const WinningCardMarker = ({ visible }: { visible: boolean }) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      data-winning-card={visible}
      className="-rotate-90"
    >
      <motion.path
        d="M 50,50 m 45, 0 a 45,45 0 1,0 -90,0 a 45,45 0 1,0 90,0"
        stroke="white"
        strokeWidth="10"
        fill="none"
        pathLength={0}
        display="none"
      />
    </svg>
  );
};

const Marker = () => {
  const {
    playerTurn,
    gameResult: { gameOver },
  } = useGame();

  if (gameOver) return;

  return (
    <div className="absolute top-[-24px] translate-y-[-100%] select-none pointer-events-none">
      <Image
        src={playerTurn == Player.PLAYER_ONE ? MarkerRed : MarkerYellow}
        alt="Marker"
      />
    </div>
  );
};

function useAnimateDiscs() {
  const [scope, animate] = useAnimate();
  const {
    grid,
    gameResult: { gameOver, winningDiscs },
  } = useGame();

  useEffect(() => {
    if (!winningDiscs.length) return;
    animate(
      `svg[data-winning-card="true"] path`,
      {
        pathLength: 1,
        display: "block",
      },
      {
        duration: 0.5,
        delay: stagger(0.5, { from: "first" }),
      }
    );
  }, [gameOver, grid]);

  return scope;
}

export default GameGrid;
