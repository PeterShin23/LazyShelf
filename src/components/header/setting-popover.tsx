import * as React from "react";
import { colorPairs } from "../../constants/colors";
import { AppActions } from "../../contexts/app-context";
import useAppContext from "../../hooks/app-hook";
import { ContainerView } from "../../shared/enums/fe";

export const SettingPopover = ({ closeSettingPopover }) => {
  const { state, dispatch } = useAppContext();
  const { uiColor } = state;

  const onSettingClick = (onClick) => {
    onClick();
    closeSettingPopover();
  }

  const settingActions = React.useMemo(() => [
    {
      id: "LOGIN",
      label: "Log In",
      hidden: false,
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
      hidden: false,
      onClick: () => {
        dispatch({
          type: AppActions.SetContainerView,
          payload: ContainerView.SignUpCards,
        })
      },
    },
    {
      id: "SETTINGS",
      label: "Settings",
      hidden: true,
      onClick: () => {},
    },
    {
      id: "THEDEV",
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
            color: colorPairs[uiColor].dark
          }}
          id={setting.id}
          onClick={() => onSettingClick(setting.onClick)}
        >
          {setting.label}
        </button>)
      })}
    </div>
    );
}