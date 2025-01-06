import './styles.css';

import { API } from "./client/api";
import * as React from "react";
import { StartLoadingScreen } from './components/common/start-loading-screen';
import { ShowCaseContainer } from './components/showcase-container';
import { colorPairs } from './constants/colors';
import { Media } from './shared/types/s3';
import { appReducer } from './reducers/app-reducer';
import { AppContext } from './contexts/app-context';
import { ContainerView } from './shared/enums/fe';
import { BETA_IG_USER_IDS } from './shared/constants';
import { InitialState } from './shared/types/intial-state';

type AppProps = {
  initialState: InitialState
}

const App = ({ initialState }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [igUserMedia, setIgUserMedia] = React.useState<Media[][]>(() => []);

  const getMedia = async () => {
    await API.getIgUserMedia(initialState.userConfig)
      .then(res => {
        setIgUserMedia(res)
      })
      .catch(err => console.log("failed to get media"))
  }

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      history.replaceState(null, "", `${window.location.origin}/${initialState.username}`);
    }

    getMedia();
    const timerId = setTimeout(() => setIsLoading(false), 2500)

    return () => clearTimeout(timerId);
  }, []);

  const [appState, appDispatch] = React.useReducer(appReducer, {
    uiColor: initialState.userConfig?.uiOptions?.color ?? "panda",
    view: ContainerView.MediaDisplay,
    enabledIgUsers: BETA_IG_USER_IDS,
    initialState: initialState,
    isSignedIn: false,
    updatedConfigs: undefined,
  });

  return (
    <AppContext.Provider value={{ state: appState, dispatch: appDispatch }}>
      <div id="showcase-container" className={`app-font`} 
        style={{ 
          backgroundColor: colorPairs[appState.uiColor].light, 
          color: colorPairs[appState.uiColor].darkest,
          minHeight: "100vh",
          maxHeight: "fit-content"
        }}>
        {typeof window !== 'undefined' ? (
          isLoading 
          ? <StartLoadingScreen />
          : (
              <ShowCaseContainer 
                igUserMedia={igUserMedia}
              />
            )
        ) : <></>}
      </div>
    </AppContext.Provider>
  )
}

export default App;
