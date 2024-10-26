// import React from 'react';
import './App.css';
import './style.less';
// import { ShowCaseContainer } from './components/showcase-container';

import { API } from "./client/api";
import * as React from "react";
import * as Toaster from "./components/common/toast";
import { httpsRoute } from "./shared/constants/https";
import { StartLoadingScreen } from './components/common/start-loading-screen';
import { ShowCaseContainer } from './components/showcase-container';
import { colorPairs } from './constants/colors';

const App = () => {
  const [text, setText] = React.useState<string>("before click");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [shortLivedToken, setShortLivedToken] = React.useState<string>(undefined);

  React.useEffect(() => {
    const apiResponse2 = API.getTestDataFromServer().then(res => console.log(res));

    // const timerId = setTimeout(() => setIsLoading(false), 2500)

    // return () => clearTimeout(timerId);
  }, []);

  const clientId = '1177264733363284';
  const redirectUri = `${httpsRoute}/instagram-auth.html`; // Should match exactly what you registered

  const openInstagramLogin = () => {
    const authUrl = `https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish`;
    window.open(authUrl, '_blank');
  };

  const handleAccessToken = (event: MessageEvent) => {
    try {
      if (event.origin === httpsRoute) {
        const accessToken = event.data?.code;
        if (accessToken) {
          setShortLivedToken(accessToken);
        }
      }
    } catch {
      Toaster.error("Something went wrong!")
    }
  };

  React.useEffect(() => {
    window.addEventListener('message', handleAccessToken);

    return () => {
      window.removeEventListener('message', handleAccessToken);
    };
  }, []);

  return (
    <div id="showcase-container" className="app-font" style={{ backgroundColor: colorPairs["green"].light }}>
      {isLoading 
        ? <StartLoadingScreen />
        : (
            // temp stuff
            // <div>
            //   <button 
            //     className="text-white bg-black"
            //     onClick={openInstagramLogin}
            //   >
            //     Click me to change
            //   </button>
            //   <p className="text-blue-700">{text}</p>
            // </div>
            <ShowCaseContainer />
          )
      }
    </div>
  )
}

export default App;
