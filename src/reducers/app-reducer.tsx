import { ContainerView } from "../shared/enums/fe";
import { AppActions, AppDispatchType, AppState } from "../contexts/app-context";

const actionExecutorMap: Record<AppActions, (state: AppState, payload: any) => AppState> = {
  [AppActions.SetUiOptionColor]: (state: AppState, uiColor: string): AppState => {
    return { ...state, uiColor }
  },
  [AppActions.SetContainerView]: (state: AppState, view: ContainerView): AppState => {
    return {
      ...state,
      view,
    }
  }
}

export const appReducer = (state: AppState, action: AppDispatchType) => {
  const { type, payload } = action;

  const actionExecutor = actionExecutorMap[type];

  return actionExecutor(state, payload as any);
}