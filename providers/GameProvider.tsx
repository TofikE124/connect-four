"use client";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

export enum Player {
  PLAYER_ONE = "Player 1",
  PLAYER_TWO = "Player 2",
}

interface Disc {
  player: Player | null;
  index: number;
}

type GameContextType = {
  grid: Disc[][];
  playerOneScore: number;
  playerTwoScore: number;
  playerTurn: Player;
  chooseDisc: (row: number, col: number) => void;
  mostBottomEmpty: (col: number) => number;
  timeLeft: number;
  gameResult: GameResult;
  isPaused: boolean;
  pauseGame: () => void;
  continueGame: () => void;
  restartGame: () => void;
  playAgain: () => void;
};

type GameResult = {
  gameOver: boolean;
  winner: Player | null;
  winningDiscs: Disc[];
  winningCoords: { row: number; col: number }[];
};

export const GameContext = createContext<GameContextType | null>(null);

const GameProvider = ({ children }: PropsWithChildren) => {
  const FULL_TIME = 5;

  const [grid, setGrid] = useState<Disc[][]>([]);
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [playerTurn, setPlayerTurn] = useState<Player>(Player.PLAYER_ONE);
  const [timeLeft, setTimeLeft] = useState(FULL_TIME);
  const [gameResult, setGameResult] = useState<GameResult>({
    gameOver: false,
    winner: null,
    winningCoords: [],
    winningDiscs: [],
  });
  const [isPaused, setIsPaused] = useState(false);
  const [starterPlayer, setStarterPlayer] = useState(Player.PLAYER_ONE);

  const initializeGrid = () => {
    let newGrid: Disc[][] = [];
    for (let i = 0; i < 6; i++) {
      newGrid[i] = [];
      for (let j = 0; j < 7; j++) {
        newGrid[i][j] = { player: null, index: i * 7 + j }; // You can initialize with any value here
      }
    }
    setGrid(newGrid);
  };

  useEffect(() => {
    initializeGrid();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      nextTurn();
    }
  }, [timeLeft]);

  useEffect(() => {
    const startCounting = () => {
      setTimeLeft((prevTimeLeft) =>
        !gameResult.gameOver && !isPaused ? prevTimeLeft - 1 : prevTimeLeft
      );
    };
    const interval = setInterval(startCounting, 1000);
    return () => clearInterval(interval);
  }, [gameResult.gameOver, isPaused, playerTurn]);

  useEffect(() => {
    const result = checkForGameOver();
    if (result.gameOver) {
      handleWinner(result);
    }
    setGameResult(result);
  }, [grid]);

  const handleWinner = (result: GameResult) => {
    if (!result.winner) return;
    if (result.winner == Player.PLAYER_ONE)
      setPlayerOneScore((score) => score + 1);
    else setPlayerTwoScore((score) => score + 1);
  };

  const chooseDisc = (row: number, col: number) => {
    if (gameResult.gameOver || isPaused) return;
    setGrid((prevGrid) =>
      prevGrid.map((r, i) =>
        r.map((el, j) =>
          row == i && col == j ? { ...el, player: playerTurn } : el
        )
      )
    );
    nextTurn();
  };

  const nextTurn = () => {
    setPlayerTurn((prevPlayer) =>
      prevPlayer === Player.PLAYER_ONE ? Player.PLAYER_TWO : Player.PLAYER_ONE
    );
    setTimeLeft(FULL_TIME);
  };

  const mostBottomEmpty = (col: number) => {
    const row = grid.findLastIndex((row) => !row[col].player);
    return row;
  };

  const pauseGame = () => {
    setIsPaused(true);
  };
  const continueGame = () => {
    setIsPaused(false);
  };

  const playAgain = () => {
    setGameResult({
      gameOver: false,
      winner: null,
      winningCoords: [],
      winningDiscs: [],
    });
    setTimeLeft(FULL_TIME);

    const nextStarter =
      starterPlayer == Player.PLAYER_ONE
        ? Player.PLAYER_TWO
        : Player.PLAYER_ONE;

    setPlayerTurn(nextStarter);
    setStarterPlayer(nextStarter);
    initializeGrid();
    setIsPaused(false);
  };

  const restartGame = () => {
    setGameResult({
      gameOver: false,
      winner: null,
      winningCoords: [],
      winningDiscs: [],
    });
    setTimeLeft(FULL_TIME);
    setPlayerTurn(starterPlayer);
    initializeGrid();
    setIsPaused(false);
  };

  const checkForGameOver = (): GameResult => {
    const numRows = grid.length;
    const numCols = grid[0]?.length;
    const winLength = 4; // Connect 4 requires four in a row

    const winningDiscs: Disc[] = [];
    const winningCoords: { row: number; col: number }[] = [];

    if (!grid.length)
      return {
        gameOver: false,
        winner: null,
        winningCoords: [],
        winningDiscs: [],
      };

    // Check for horizontal locations
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col <= numCols - winLength; col++) {
        if (
          grid[row][col].player !== null &&
          grid[row][col].player === grid[row][col + 1].player &&
          grid[row][col].player === grid[row][col + 2].player &&
          grid[row][col].player === grid[row][col + 3].player
        ) {
          winningDiscs.push(
            grid[row][col],
            grid[row][col + 1],
            grid[row][col + 2],
            grid[row][col + 3]
          );
          winningCoords.push(
            { row, col },
            { row, col: col + 1 },
            { row, col: col + 2 },
            { row, col: col + 3 }
          );
          return {
            gameOver: true,
            winner: grid[row][col].player,
            winningDiscs,
            winningCoords,
          };
        }
      }
    }

    // Check for vertical locations
    for (let col = 0; col < numCols; col++) {
      for (let row = 0; row <= numRows - winLength; row++) {
        if (
          grid[row][col].player !== null &&
          grid[row][col].player === grid[row + 1][col].player &&
          grid[row][col].player === grid[row + 2][col].player &&
          grid[row][col].player === grid[row + 3][col].player
        ) {
          winningDiscs.push(
            grid[row][col],
            grid[row + 1][col],
            grid[row + 2][col],
            grid[row + 3][col]
          );
          winningCoords.push(
            { row, col },
            { row: row + 1, col },
            { row: row + 2, col },
            { row: row + 3, col }
          );
          return {
            gameOver: true,
            winner: grid[row][col].player,
            winningDiscs,
            winningCoords,
          };
        }
      }
    }

    // Check for diagonal locations (top-left to bottom-right)
    for (let row = 0; row <= numRows - winLength; row++) {
      for (let col = 0; col <= numCols - winLength; col++) {
        if (
          grid[row][col].player !== null &&
          grid[row][col].player === grid[row + 1][col + 1].player &&
          grid[row][col].player === grid[row + 2][col + 2].player &&
          grid[row][col].player === grid[row + 3][col + 3].player
        ) {
          winningDiscs.push(
            grid[row][col],
            grid[row + 1][col + 1],
            grid[row + 2][col + 2],
            grid[row + 3][col + 3]
          );
          winningCoords.push(
            { row, col },
            { row: row + 1, col: col + 1 },
            { row: row + 2, col: col + 2 },
            { row: row + 3, col: col + 3 }
          );
          return {
            gameOver: true,
            winner: grid[row][col].player,
            winningDiscs,
            winningCoords,
          };
        }
      }
    }

    // Check for diagonal locations (bottom-left to top-right)
    for (let row = numRows - 1; row >= winLength - 1; row--) {
      for (let col = 0; col <= numCols - winLength; col++) {
        if (
          grid[row][col].player !== null &&
          grid[row][col].player === grid[row - 1][col + 1].player &&
          grid[row][col].player === grid[row - 2][col + 2].player &&
          grid[row][col].player === grid[row - 3][col + 3].player
        ) {
          winningDiscs.push(
            grid[row][col],
            grid[row - 1][col + 1],
            grid[row - 2][col + 2],
            grid[row - 3][col + 3]
          );
          winningCoords.push(
            { row, col },
            { row: row - 1, col: col + 1 },
            { row: row - 2, col: col + 2 },
            { row: row - 3, col: col + 3 }
          );
          return {
            gameOver: true,
            winner: grid[row][col].player,
            winningDiscs,
            winningCoords,
          };
        }
      }
    }

    // Check for a draw
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        if (grid[row][col].player === null) {
          return {
            gameOver: false,
            winner: null,
            winningDiscs: [],
            winningCoords: [],
          }; // Game is not over yet
        }
      }
    }

    return {
      gameOver: true,
      winner: null,
      winningDiscs: [],
      winningCoords: [],
    }; // It's a draw
  };

  return (
    <GameContext.Provider
      value={{
        playerOneScore,
        playerTwoScore,
        grid,
        playerTurn,
        chooseDisc,
        mostBottomEmpty,
        timeLeft,
        gameResult,
        isPaused,
        pauseGame,
        continueGame,
        playAgain,
        restartGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
