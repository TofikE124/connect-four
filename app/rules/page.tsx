import Button from "@/components/Button";
import React from "react";

import CheckIcon from "/public/images/icon-check.svg";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect 4 | Rules",
  description: "Connect 4 Game Rules",
};

const page = () => {
  return (
    <div className="w-full h-screen bg-purple">
      <div className="size-full grid place-items-center">
        <div className="bg-white lgmd:max-w-[480px] sm:mx-[5vw] sm:max-w-[340px] relative space-y-7 pt-[30px] lgmd:pb-[56px] sm:pb-20 lgmd:px-[34px] sm:px-5 rounded-[40px] shadow-[0px_10px_0px_0px_black] border-[3px] border-solid border-black">
          <h2 className="heading-l text-black uppercase text-center">Rules</h2>
          <div className="space-y-4">
            <h4 className="heading-s text-purple uppercase">Objective</h4>
            <p className="text-black">
              Be the first player to connect 4 of the same colored discs in a
              row (either vertically, horizontally, or diagonally).
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="heading-s text-purple uppercase">How To Play</h4>
            <ol className="space-y-3 list-decimal list-inside ">
              <li>
                <span className="opacity-60">
                  Red goes first in the first game.
                </span>
              </li>
              <li>
                <span className="opacity-60">
                  Players must alternate turns, and only one disc can be dropped
                  in each turn.
                </span>
              </li>
              <li>
                <span className="opacity-60">
                  The game ends when there is a 4-in-a-row or a stalemate.
                </span>
              </li>
              <li>
                <span className="opacity-60">
                  The starter of the previous game goes second on the next game.
                </span>
              </li>
            </ol>
          </div>
          <Link
            href="/"
            className="absolute bottom-0 translate-y-[50%] left-[50%] translate-x-[-50%]"
          >
            <Button variant="icon" color="red" icon={CheckIcon}></Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
