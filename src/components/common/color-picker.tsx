import * as React from "react";
import { colorPairsList } from "../../constants/colors";
import useAppContext from "../../hooks/app-hook";

type ColorPickerProps = {
  xPosition: number;
  yPosition: number;
  onClick: (colorPairName: string) => void;
}

export const ColorPicker = ({ xPosition, yPosition, onClick }: ColorPickerProps) => {
  const { state } = useAppContext();

  const currentSelectedColor = React.useMemo(() => {
    return state.updatedConfigs?.updatedUiColor ?? state.uiColor;
  }, [state.updatedConfigs?.updatedUiColor, state.uiColor]);

  return (
    <div 
      className="absolute flex flex-col w-16 h-auto gap-y-4 p-2 bg-white border rounded-2xl"
      id="color-picker-popover"
      style={{
        left: xPosition,
        top: yPosition,
        transform: "translate(-50%, 0%)",
        zIndex: 2,
      }}  
    >
      {colorPairsList.map(pair => (
        <div className="size-12 rounded-full relative cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${pair.dark} 50%, ${pair.light} 50%)`,
            borderColor: pair.dark,
            borderWidth: "2px",
          }}
          onClick={() => onClick(pair.name)}
        >
          {currentSelectedColor === pair.name && (
            <span
              className="absolute top-0 right-0"
              style={{
                color: pair.dark,
                fontSize: "12px",
                zIndex: 1,
              }}
            >
              ✔
            </span>
          )}
        </div>
      ))}
    </div>
  )
}