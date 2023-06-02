import React, { useState, useEffect } from "react";
import MainContext from "./MainContext";
import bgMusic from "../../../src/bg.mp3";
import userTurnSound from "../../../src/user.wav";
import computerTurnSound from "../../../src/comp.wav";
import clickSound from "../../../src/click.wav";
import quitSound from "../../../src/quit.wav";
import winSound from "../../../src/win.mp3";
import drawSound from "../../../src/draw.wav";
import loseSound from "../../../src/lose.wav";

const MainState = (props) => {
  const [audio] = useState(new Audio(bgMusic));
  const [userAudio] = useState(new Audio(userTurnSound));
  const [computerAudio] = useState(new Audio(computerTurnSound));
  const [click] = useState(new Audio(clickSound));
  const [quit] = useState(new Audio(quitSound));
  const [winAudio] = useState(new Audio(winSound));
  const [drawAudio] = useState(new Audio(drawSound));
  const [loseAudio] = useState(new Audio(loseSound));
  const [goHome, setGoHome] = useState(false);
  const [mode, setMode] = useState(false);
  const [music, setMusic] = useState(100);
  const [sound, setSound] = useState(100);

  useEffect(() => {
    audio.loop = true;
    audio.play();
    audio.volume = music / 100;
  }, [music]);

  useEffect(() => {
    userAudio.volume = sound / 100;
    computerAudio.volume = sound / 100;
    click.volume = sound / 100;
    quit.volume = sound / 100;
    winAudio.volume = sound / 100;
    drawAudio.volume = sound / 100;
    loseAudio.volume = sound / 100;
  }, [sound]);

  return (
    <MainContext.Provider
      value={{
        audio,
        userAudio,
        computerAudio,
        click,
        quit,
        winAudio,
        drawAudio,
        loseAudio,
        goHome,
        setGoHome,
        mode,
        setMode,
        music,
        setMusic,
        sound,
        setSound,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};
export default MainState;
