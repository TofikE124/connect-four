import Image from "next/image";
import Button from "../components/Button";

import Link from "next/link";
import logo from "/public/images/logo.svg";
import PlayerVSCPU from "/public/images/player-vs-cpu.svg";
import PlayerVSPlayer from "/public/images/player-vs-player.svg";

export default function Home() {
  return (
    <main className="w-full h-screen bg-dark-purple">
      <div className="w-full h-full grid place-items-center">
        <div className="bg-purple shadow-[0px_10px_0px_0px_black] border-[3px] border-solid border-black rounded-[40px] px-10 py-[70px]">
          <Image
            src={logo}
            width={52}
            height={52}
            alt="Logo icon"
            className="mb-20 mx-auto"
          ></Image>
          <div className="flex flex-col gap-[30px]">
            <Link href="/play/player-vs-player">
              <Button
                color="yellow"
                variant="text-with-icon"
                icon={PlayerVSPlayer}
                textPosition="left"
              >
                Player VS Player
              </Button>
            </Link>

            <Link href="/play/player-vs-cpu">
              <Button
                color="red"
                variant="text-with-icon"
                icon={PlayerVSCPU}
                textPosition="left"
              >
                Player VS CPU
              </Button>
            </Link>
            <Link href="/rules">
              <Button color="white" variant="text" textPosition="left">
                Game Rules
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
