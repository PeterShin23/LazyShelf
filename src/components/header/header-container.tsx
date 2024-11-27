import * as React from "react";
import useAppContext from "../../hooks/app-hook";
import { colorPairs } from "../../constants/colors";
import { AppActions } from "../../contexts/app-context";
import { ContainerView } from "../../shared/enums/fe";
import { Chevron } from "../../static/svgs/chevron";
import { SettingPopover } from "./setting-popover";

export const HeaderContainer = () => {
  const userName = "peter.shin";

  const { state, dispatch } = useAppContext();
  const { uiColor, initialState } = state;

  const [onUsernameHover, setOnUsernameHover] = React.useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState<boolean>(false);

  const toggleIsSettingsOpen = () => {
    setIsSettingsOpen(!isSettingsOpen);
  }

  return (
    <div 
      id="header-container" 
      className="header"
      style={{
        height: "54px",
        backgroundColor: colorPairs[uiColor].dark
      }}
    >
      <div 
        className="header-left font-weight-medium"
        style={{ color: colorPairs[uiColor].light }}
        >theshowcase.me</div>
      <a 
          className="font-weight-light header-middle" 
          style={{ 
            color: onUsernameHover
              ? colorPairs[uiColor].darkest 
              : colorPairs[uiColor].light,
            transition: 'color 0.2s ease-in-out',

          }}
          href={`https://instagram.com/${initialState.username ?? "peter.shin"}`}
          target="_blank" 
          rel="noopener noreferrer"
          onMouseEnter={() => setOnUsernameHover(true)}
          onMouseLeave={() => setOnUsernameHover(false)}
          >@{initialState.username ?? "peter.shin"}</a>
        <div className="header-right flex flex-row gap-x-4 items-center">
          {state.view === ContainerView.TheDevDisplay ? (
            <button 
              className="font-weight-medium text-xs px-4 py-2 rounded-lg"
              onClick={() => {
                dispatch({
                  type: AppActions.SetContainerView,
                  payload: ContainerView.MediaDisplay
                })
              }}
              style={{ 
                backgroundColor: colorPairs[uiColor].light,
                color: colorPairs[uiColor].dark, 
              }}
              >Go Back</button>
          ) : (
            <>
              <div 
                className="relative flex justify-center items-center rounded-full overflow-hidden"
              >
                <img 
                  src={initialState.userIgData.profile_picture_url}
                  alt="IG PFP" 
                  width="36px"
                />
              </div>
              <Chevron onClick={toggleIsSettingsOpen} fillColor={colorPairs[uiColor].light} className="relative" isOpen={isSettingsOpen} />
              {isSettingsOpen && (
                <SettingPopover closeSettingPopover={() => setIsSettingsOpen(false)}/>
              )}
            </>
          )}
        </div>
    </div>
  )
}