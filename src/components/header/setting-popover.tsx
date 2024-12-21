import * as React from "react";
import { colorPairs } from "../../constants/colors";
import { AppActions } from "../../contexts/app-context";
import useAppContext from "../../hooks/app-hook";
import { ContainerView } from "../../shared/enums/fe";

export const SettingPopover = ({ closeSettingPopover }) => {
  const { state, dispatch } = useAppContext();
  const { uiColor } = state;

  const [settingHover, setSettingHover] = React.useState<string | null>(null);

  const onSettingClick = (onClick) => {
    onClick();
    closeSettingPopover();
  }

  const settingActions = React.useMemo(() => [
    {
      id: "LOG_IN",
      label: "Log In",
      hidden: state.isSignedIn,
      onClick: () => {
        dispatch({
          type: AppActions.SetContainerView,
          payload: ContainerView.LoginCard,
        })
      },
    },
    {
      id: "REGISTER",
      label: "Register",
      hidden: state.isSignedIn,
      onClick: () => {
        dispatch({
          type: AppActions.SetContainerView,
          payload: ContainerView.SignUpCards,
        })
      },
    },
    {
      id: "CREATOR_MODE",
      label: "Creator Mode",
      hidden: !state.isSignedIn,
      onClick: () => {
        dispatch({
          type: AppActions.SetContainerView,
          payload: ContainerView.CreatorMode
        })
      },
    },
    {
      id: "THE_DEV",
      label: "Meet the Dev",
      hidden: false,
      onClick: () => {
        dispatch({
          type: AppActions.SetContainerView,
          payload: ContainerView.TheDevDisplay
        })
      }
    }
  ], []);

  return (
    <div 
      className="absolute top-14 right-3 border-2 size-auto flex flex-col"
      style={{
        backgroundColor: colorPairs[uiColor].light,
        borderColor: colorPairs[uiColor].dark,
      }}
    >
      {settingActions.map(setting => {
        if (setting.hidden) return null;

       return ( <button
          className="p-2 text-left font-size-s"
          style={{
            color: colorPairs[uiColor].dark,
            backgroundColor: colorPairs[uiColor].light,
            filter: settingHover === setting.id ? "brightness(0.95)" : undefined,
            transition: "filter 0.2s ease",
          }}
          id={setting.id}
          onClick={() => onSettingClick(setting.onClick)}
          onMouseEnter={() => setSettingHover(setting.id)}
          onMouseLeave={() => setSettingHover(null)}
        >
          {setting.label}
        </button>)
      })}
    </div>
    );
}