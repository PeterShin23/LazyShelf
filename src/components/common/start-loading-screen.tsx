import React from "react";
import { colorPairs } from "../../constants/colors";

export const StartLoadingScreen = () => {
  return (
    <div 
      className="w-screen h-screen flex justify-center font-weight-light items-center text-3xl"
      style={{ backgroundColor: colorPairs["green"].light }}
    >
      <p className="p-10">Welcome to my showcase.</p>
    </div>
  )
}