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
  
  const [onPageHover, setOnPageHover] = React.useState<boolean>(false);
  const [onUsernameHover, setOnUsernameHover] = React.useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState<boolean>(false);

  const toggleIsSettingsOpen = () => {
    setIsSettingsOpen(!isSettingsOpen);
  }

  const onCreatorModeClick = (onClick: () => void) => {
    onClick();
  }
  const onUpdatedConfigsSave = () => {
    // SEND PATCH REQUEST TO DYNAMO
    console.log("Updating configs in AWS dynamo")
  }

  const getRightSideInterations = () => {
    switch (state.view) {
      case ContainerView.TheDevDisplay:
        return (
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
            >Go Back
          </button>
        );
      case ContainerView.CreatorMode:
        return (
          <div className="flex flex-row gap-x-3">
            <button
              className="font-weight-medium text-xs px-4 py-2 rounded-lg"
              style={{ 
                backgroundColor: colorPairs[uiColor].light,
                color: colorPairs[uiColor].dark, 
              }}
              onClick={() => onCreatorModeClick(onUpdatedConfigsSave)}
            >
              Save
            </button>
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
              >Cancel
            </button>
            {/** TODO: Figure out good flow for delete page */}
            {/* <div 
              className="border-l-2 h-auto rounded-lg"
              style={{
                borderColor: colorPairs[uiColor].light,
              }} />
            <button 
              className="font-weight-medium text-xs px-4 py-2 rounded-lg"
              onClick={() => {
                dispatch({
                  type: AppActions.SetContainerView,
                  payload: ContainerView.MediaDisplay
                })
              }}
              style={{ 
                backgroundColor: "red",
                color: "white", 
              }}
              >Delete Page
            </button> */}
          </div>
        );
      default:
        return (
          <>
            <div 
              className="relative flex justify-center items-center rounded-full overflow-hidden"
            >
              <img 
                src={initialState.userIgData.profile_picture_url}
                alt="PF" 
                width="36px"
              />
            </div>
            <Chevron onClick={toggleIsSettingsOpen} fillColor={colorPairs[uiColor].light} className="relative" isOpen={isSettingsOpen} />
            {isSettingsOpen && (
              <SettingPopover closeSettingPopover={() => setIsSettingsOpen(false)}/>
            )}
          </>
        )
    }
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
        ><a 
        style={{ 
          color: onPageHover
            ? colorPairs[uiColor].darkest 
            : colorPairs[uiColor].light,
          transition: 'color 0.2s ease-in-out',

        }}
        href={`${process.env.APP_URL}`}
        target="_blank" 
        rel="noopener noreferrer"
        onMouseEnter={() => setOnPageHover(true)}
        onMouseLeave={() => setOnPageHover(false)}
        >theshowcase.me</a></div>
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
          {getRightSideInterations()}
        </div>
    </div>
  )
}