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

type AppProps = {
  initialState: any
}

const App = (props) => {
  console.log(props.initialState);

  const [text, setText] = React.useState<string>("before click");
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [shortLivedToken, setShortLivedToken] = React.useState<string>(undefined);
  const [igUserMedia, setIgUserMedia] = React.useState<Media[][]>(undefined);

  // const [hideOverflowY, setHideOverflowY] = React.useState<boolean>();

  // const hideVerticalOverflow = (hide: boolean) => {
  //   setHideOverflowY(hide);
  // }

  const getMedia = async () => {
    await API.getIgUserMedia()
    // await API.getIgUserMediaOffline()
      .then(res => {
        console.log(res);
        setIgUserMedia(res)
      })
      .catch(err => console.log("failed to get media"))
  }

  React.useEffect(() => {
    // const apiResponse2 = API.getTestDataFromServer().then(res => console.log(res));

    getMedia();
    getIgUserData();
    const timerId = setTimeout(() => setIsLoading(false), 500)

    return () => clearTimeout(timerId);
  }, []);

  // const clientId = '1177264733363284';
  // const redirectUri = `${httpsRoute}/instagram-auth.html`; // Should match exactly what you registered

  // const openInstagramLogin = () => {
  //   const authUrl = `https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish&instagram_graph_user_profile`;
  //   window.open(authUrl, '_blank');
  // };

  // const handleAccessToken = async (event: MessageEvent) => {
  //   try {
  //     if (event.origin === httpsRoute) {
  //       const shortLivedAccessToken = event.data?.code;
  //       if (shortLivedAccessToken) {
  //         console.log(shortLivedAccessToken)
  //         // setShortLivedToken(code);
  //         const response = await API.retrieveLongLivedAccessToken(shortLivedAccessToken)
  //         // console.log(response);
  //       }
  //     }
  //   } catch (e) {
  //     console.log(e)
  //     Toaster.error("Something went wrong!")
  //   }
  // };

  const getIgUserData = async () => {
    try {
      const response = await API.getIgUser();
      console.log(response);
    } catch {
      Toaster.error("Failed to get IG User Data");
    }
  }

  // React.useEffect(() => {
  //   window.addEventListener('message', handleAccessToken);

  //   return () => {
  //     window.removeEventListener('message', handleAccessToken);
  //   };
  // }, []);

  const [appState, appDispatch] = React.useReducer(appReducer, {
    uiColor: "panda",
    view: ContainerView.MediaDisplay,
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
              // temp stuff
              // <div>
              //   <button 
              //     className="text-white bg-black"
              //     // onClick={openInstagramLogin}
              //     onClick={getIgUserData}
              //   >
              //     Click me to change
              //   </button>
              //   <p className="text-blue-700">{text}</p>
              // </div>
              <ShowCaseContainer 
                igUserMedia={igUserMedia}
                // hideVerticalOverflow={hideVerticalOverflow}
              />
              // <div>
              // {mediaLinks && mediaLinks.flatMap(m => (
              //   <img src={m} className="max-w-80" />
              // ))}
              // </div>
            )
        ) : <></>}
      </div>
    </AppContext.Provider>
  )
}

export default App;
