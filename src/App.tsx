// import React from 'react';
import './App.css';
import './style.less';

import { API } from "./client/api";
import * as React from "react";
import * as Toaster from "./components/common/toast";
import { httpsRoute } from "./shared/constants/https";
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
  console.log("initialState", initialState);

  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [igUserMedia, setIgUserMedia] = React.useState<Media[][]>(() => []);

  // const [hideOverflowY, setHideOverflowY] = React.useState<boolean>();

  // const hideVerticalOverflow = (hide: boolean) => {
  //   setHideOverflowY(hide);
  // }

  const getMedia = async () => {
    await API.getIgUserMedia()
    // await API.getIgUserMediaOffline()
      .then(res => {
        // console.log(res);
        setIgUserMedia(res)
      })
      .catch(err => console.log("failed to get media"))
  }

  // const getUserConfig = async () => {
  //   await API.getUserConfigTest()
  //     .then(res => {
  //       // console.log(res);
  //       setUserConfig(res)
  //     })
  //     .catch(err => console.log("failed to get user config"))
  // }

  React.useEffect(() => {
    // const apiResponse2 = API.getTestDataFromServer().then(res => console.log(res));

    getMedia();
    // getIgUserData();
    // getUserConfig();
    const timerId = setTimeout(() => setIsLoading(false), 1500)

    return () => clearTimeout(timerId);
  }, []);

  const getIgUserData = async () => {
    try {
      const response = await API.getIgUser();
      // console.log(response);
    } catch {
      Toaster.error(appState.uiColor, "Failed to get IG User Data");
    }
  }

  const [appState, appDispatch] = React.useReducer(appReducer, {
    uiColor: initialState.userConfig?.uiOptions?.color ?? "green",
    view: ContainerView.MediaDisplay,
    enabledIgUsers: BETA_IG_USER_IDS,
    initialState: initialState,
  })

  return (
    <AppContext.Provider value={{ state: appState, dispatch: appDispatch }}>
      <div id="showcase-container" className={`app-font`} 
        style={{ 
          backgroundColor: colorPairs[appState.uiColor].light, 
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
