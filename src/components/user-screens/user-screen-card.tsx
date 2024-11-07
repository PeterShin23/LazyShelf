import * as React from "react";
import { AppActions } from "../../contexts/app-context";
import { ContainerView } from "../../shared/enums/fe";
import { colorPairs } from "../../constants/colors";
import useAppContext from "../../hooks/app-hook";

type UserScreenCardProps = {
  children?: any;
  headerText: string;
}

export const UserScreenCard = (props: UserScreenCardProps) => {
  const { children, headerText } = props;

  const { state, dispatch } = useAppContext();

  const onClose = () => {
    dispatch({
      type: AppActions.SetContainerView,
      payload: ContainerView.MediaDisplay
    })
  }

  return (
    <div 
      className="user-screen-card flex flex-shrink-0 flex-col bg-white rounded-lg p-4 overflow-y-auto whitespace-normal"
      style={{
        width: "100%",
        height: "500px",
        backgroundColor: colorPairs[state.uiColor].light
      }}>
        <div className="relative mb-6">
          <div>{headerText}</div>
          <button 
            className="absolute right-0 top-0"
            onClick={onClose}
            >x</button>
        </div>
        {children}
    </div>
  )
}