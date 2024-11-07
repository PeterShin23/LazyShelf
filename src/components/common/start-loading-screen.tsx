import React from "react";
import useAppContext from "../../hooks/app-hook";
import { colorPairs } from "../../constants/colors";

export const StartLoadingScreen = () => {
  const { state, dispatch } = useAppContext();
  const { uiColor } = state;

  return (
    <div 
      className="w-screen h-screen flex justify-center font-weight-light items-center text-3xl"
      style={{ backgroundColor: colorPairs[uiColor].light }}
    >
      <p className="p-10">Welcome to my showcase.</p>
    </div>
  )
}