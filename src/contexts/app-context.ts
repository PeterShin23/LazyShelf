import * as React from "react";
import { ContainerView } from "../shared/enums/fe";
import { InitialState } from "../shared/types/intial-state";

export enum AppActions {
  SetUiOptionColor = "set-ui-option-color",
  SetContainerView = "set-container-view",
  SetSignedIn = "set-signed-in",
  SetUpdatedConfigs = "set-updated-configs",
}

export type AppDispatchType = 
  { type: AppActions.SetUiOptionColor; payload: string }
  | { type: AppActions.SetContainerView; payload: ContainerView }
  | { type: AppActions.SetUpdatedConfigs; payload: UpdatedConfigs }
  | { type: AppActions.SetSignedIn; payload: boolean };

export type UpdatedConfigs = {
  updatedUiColor?: string;
  updatedTagLine?: string;
  updatedDescription?: string;
}

export type AppState = {
  uiColor: string;
  isSignedIn?: boolean;
  view: ContainerView;
  enabledIgUsers: string[];
  initialState: InitialState;
  updatedConfigs?: UpdatedConfigs;
}

export type AppContextType = {
  state: AppState;
  dispatch: React.Dispatch<AppDispatchType>;
}

const AppContext = React.createContext<AppContextType>({} as AppContextType);

export { AppContext };