import GameProvider from "@/providers/GameProvider";
import React, { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
  return <GameProvider>{children}</GameProvider>;
};

export default layout;
