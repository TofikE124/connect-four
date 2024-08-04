"use client";
import SmallButton from "@/components/SmallButton";
import useGame from "@/hooks/useGame";
import { Player } from "@/app/types/Player";
import { motion, stagger, useAnimate } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ReactConfetti from "react-confetti";
import MarkerRed from "/public/images/marker-red.svg";
import MarkerYellow from "/public/images/marker-yellow.svg";

import TurnBackgroundRed from "/public/images/turn-background-red.svg";
import TurnBackgroundYellow from "/public/images/turn-background-yellow.svg";

const GameGrid = () => {
  const {
    chooseDisc,
    mostBottomEmpty,
    gameResult: { gameOver },
    isCpuTurn,
  } = useGame();
  const [highLightedCol, setHighlighedCol] = useState<number | null>(null);

  const scope = useAnimateDiscs();

  const handlePointerOver = (e: React.PointerEvent) => {
    if (gameOver || isCpuTurn()) return;
    const { closestTop, col } = getClosestDiscAtTop(e);
    setHighlighedCol(col);
  };

  const handleClick = (e: any) => {
    const { closestTop, col } = getClosestDiscAtTop(e);
    if (col == null) return;
    const row = mostBottomEmpty(col);
    if (row == -1) return;

    chooseDisc(col);
    setHighlighedCol(null);
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
      onPointerLeave={() => setHighlighedCol(null)}
      onClick={(e) => handleClick(e)}
      className="relative grid-in-chart w-fit place-self-center"
    >
      <div
        ref={scope}
        className="relative z-50 xsm:w-[270px] xsm:h-[250px] sm-range:w-[335px] sm-range:h-[310px] md:w-[500px] md:h-[462px] lg:w-[632px] lg:h-[584px] shadow-[0px_10px_0px_0px_black] flex flex-col justify-center xsm:gap-[7.84px] sm-range:gap-[12.74px] md:gap-[16.58px] lg:gap-6 rounded-b-[40px] xsm:p-[6.13px] xsm:pb-[23.27px] sm-range:p-[10.6px] sm-range:pb-[31.85px] md:p-[13.45px] md:pb-[42px] lg:p-[20px] lg:pb-[60px] select-none mx-auto"
        data-grid
      >
        <Rows highlightedCol={highLightedCol}></Rows>
      </div>
      <div className="absolute inset-0 z-30 xsm:bg-[url(/images/board-layer-black-extra-small.svg)] sm-range:bg-[url(/images/board-layer-black-small.svg)] md:bg-[url(/images/board-layer-black-medium.svg)] lg:bg-[url(/images/board-layer-black-large.svg)] bg-no-repeat rounded-b-[40px]"></div>
      <div className="absolute inset-0  bg-purple z-20 rounded-[30px]"></div>
      <div className="absolute inset-0 z-50 xsm:bg-[url(/images/board-layer-white-extra-small.svg)] sm-range:bg-[url(/images/board-layer-white-small.svg)] md:bg-[url(/images/board-layer-white-medium.svg)] lg:bg-[url(/images/board-layer-white-large.svg)] bg-no-repeat"></div>
      {gameOver ? (
        <div className="absolute inset-0 z-50 overflow-hidden">
          <ReactConfetti></ReactConfetti>
        </div>
      ) : null}
      <TurnBackground></TurnBackground>

      <div className="relative z-[50]">
        {gameOver ? <GameResult></GameResult> : <TurnCounter></TurnCounter>}
      </div>
    </div>
  );
};

interface RowsProps {
  highlightedCol: number | null;
}

const Rows = ({ highlightedCol }: RowsProps) => {
  const { grid } = useGame();

  return grid
    .slice()
    .reverse()
    .map((row, index) => {
      // reverse the rows so the animation starts from bottom
      const i = 5 - index;
      return (
        <div
          key={index}
          className="relative grid grid-cols-7 lgmd:gap-6"
          style={{ order: i }}
        >
          {row.map((el, j) => {
            return (
              <Disc
                row={i}
                col={j}
                highlightedCol={highlightedCol}
                index={el.index}
                player={el.player}
                key={el.index}
              ></Disc>
            );
          })}
        </div>
      );
    });
};

interface DiscProps {
  player: Player | null;
  index: number;
  row: number;
  col: number;
  highlightedCol: number | null;
}

const Disc = ({ row, col, highlightedCol, player, index }: DiscProps) => {
  const {
    mostBottomEmpty,
    gameResult: { winningDiscs, gameOver },
    playerTurn,
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
    [Player.PLAYER_ONE]: "bg-red shadow-disc",
    [Player.PLAYER_TWO]: "bg-yellow shadow-disc",
  };

  const ref = useRef(null);

  const calcDistanceFromTop = () => {
    const grid = document.querySelector("div[data-grid]") as Element;
    if (!ref.current) return 0;
    const el = ref.current as Element;

    const OFFSET = 55;

    const gridRect = grid.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const distance = gridRect.top - elRect.top;
    return distance - OFFSET;
  };

  return (
    <div
      ref={ref}
      className="relative lg:size-16 md:size-[52px] sm-range:size-[34px] xsm:size-[30px]"
    >
      <div
        data-disc
        data-row={row}
        data-col={col}
        className={`relative ${
          isHighligted(row, col) ? PlayerHighlightrMap[playerTurn] : ""
        } rounded-full w-full aspect-square`}
      >
        {isMarker(row, col) ? <Marker></Marker> : null}
      </div>
      {player ? (
        <>
          <motion.div
            data-disc
            data-row={row}
            data-col={col}
            className={`absolute inset-0 shadow-disc ${PlayerColorMap[player]} rounded-full aspect-square lgmd:p-2 sm-range:p-1 xsm:pl-[4px] xsm:pr-[2px]`}
            animate={{ y: [calcDistanceFromTop(), 0, -30, 0, -15, 0] }} // More subtle bounces for a Connect 4 disc
            transition={{
              duration: 0.8, // Total duration of the animation
              ease: [
                [0.42, 0, 1, 1], // Falling ease (fast)
                [0.22, 1, 0.36, 1], // Hit ground ease (bounce back)
                [0.42, 0, 1, 1], // First bounce fall ease
                [0.22, 1, 0.36, 1], // First bounce hit ease
                [0.42, 0, 1, 1], // Second bounce fall ease
                [0.22, 1, 0.36, 1], // Second bounce hit ease
              ],
            }}
          >
            <WinningCardMarker key={index} visible={isWinningCard(index)} />
          </motion.div>
        </>
      ) : null}
    </div>
  );
};

const TurnCounter = () => {
  const { playerTurn, timeLeft, playerNamesMap } = useGame();

  return (
    <div className="absolute text-center pointer-events-none sm:bottom-[20px] md:bottom-[45px] lg:bottom-[50px] translate-y-[100%] w-[197px] h-[165px] grid place-content-center left-[50%] translate-x-[-50%]">
      {playerTurn == Player.PLAYER_ONE ? (
        <Image
          src={TurnBackgroundRed}
          alt="Turn background red"
          className="absolute inset-0"
        />
      ) : (
        <Image
          src={TurnBackgroundYellow}
          alt="Turn background Yellow"
          className="absolute inset-0"
        />
      )}
      <div className="relative z-20">
        <h3 className="heading-xs uppercase">
          {playerNamesMap?.[playerTurn]}&#39;s Turn
        </h3>
        <h2 className="heading-l">{timeLeft}s</h2>
      </div>
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
      className="absolute py-4 px-[75px] origin-center border border-solid rounded-[20px] shadow-[0px_10px_0px_0px_black] border-black bg-white text-center sm:bottom-[15px] md:bottom-[55px] lg:bottom-[45px] grid place-content-center left-[50%] z-50"
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
        className="absolute pointer-events-none z-10 bottom-[40px] w-screen left-[calc(50%-50vw)] h-[1000px] bg-dark-purple rounded-t-[60px]"
        style={{ translate: "0% 100%" }}
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
      style={{ transform: "rotateZ(90deg) rotateY(180deg)" }}
    >
      <motion.circle
        cx="50"
        cy="50"
        r="40"
        stroke="white"
        strokeWidth={10} // Change this value to adjust the thickness
        fill="none"
        display="none"
        pathLength={0}
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
    <div className="absolute left-0 lg:translate-x-[30%] top-[-24px] translate-y-[-100%] select-none pointer-events-none">
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
      `svg[data-winning-card="true"] circle`,
      {
        pathLength: 1.1,
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
