import * as React from "react";
import useAppContext from "../../hooks/app-hook";
import { colorPairs } from "../../constants/colors";
import { AppActions } from "../../contexts/app-context";
import { ContainerView } from "../../shared/enums/fe";

export const HeaderContainer = () => {
  const userName = "peter.shin";

  const { state, dispatch } = useAppContext();
  const { uiColor } = state;

  const [onUsernameHover, setOnUsernameHover] = React.useState<boolean>(false);
  // const [rightButton, setRightButton] = React.useState<ContainerView>(state.view);

  const toggleRightButton = () => {
    if (state.view === ContainerView.MediaDisplay) {
      dispatch({
        type: AppActions.SetContainerView,
        payload: ContainerView.TheDevDisplay
      })
    } else if (state.view === ContainerView.TheDevDisplay) {
      dispatch({
        type: AppActions.SetContainerView,
        payload: ContainerView.MediaDisplay
      })
    }
  }

  const clickSignUp = () => {
    dispatch({
      type: AppActions.SetContainerView,
      payload: ContainerView.SignUpCards
    })
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
        >website.me</div>
      <a 
          className="font-weight-light header-middle" 
          style={{ 
            color: onUsernameHover
              ? colorPairs[uiColor].darkest 
              : colorPairs[uiColor].light,
            transition: 'color 0.2s ease-in-out',

          }}
          href={`https://instagram.com/${userName}`}
          target="_blank" 
          rel="noopener noreferrer"
          onMouseEnter={() => setOnUsernameHover(true)}
          onMouseLeave={() => setOnUsernameHover(false)}
          >@{"random.tag"}</a>
        <div className="header-right">

          <button 
            className="font-weight-medium text-xs px-4 py-2 rounded-lg mr-2"
            onClick={clickSignUp}
            style={{ 
              backgroundColor: colorPairs[uiColor].light,
              color: colorPairs[uiColor].dark, 
            }}
            >{"Log In or Sign up"}</button>
          <button 
            className="font-weight-medium text-xs px-4 py-2 rounded-lg"
            onClick={toggleRightButton}
            style={{ 
              backgroundColor: colorPairs[uiColor].light,
              color: colorPairs[uiColor].dark, 
            }}
            >{state.view === ContainerView.TheDevDisplay ? "Go Back" : "The Dev"}</button>
        </div>
    </div>
  )
}