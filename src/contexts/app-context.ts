import * as React from "react";
import { ContainerView } from "../shared/enums/fe";
import { InitialState } from "../shared/types/intial-state";

export enum AppActions {
  SetUiOptionColor = "set-ui-option-color",
  SetContainerView = "set-container-view",
}

export type AppDispatchType = 
  { type: AppActions.SetUiOptionColor; payload: string }
  | { type: AppActions.SetContainerView; payload: ContainerView };

export type AppState = {
  uiColor: string;
  view: ContainerView;
  enabledIgUsers: string[];
  initialState: InitialState;
}

export type AppContextType = {
  state: AppState;
  dispatch: React.Dispatch<AppDispatchType>;
}

const AppContext = React.createContext<AppContextType>({} as AppContextType);

export { AppContext };