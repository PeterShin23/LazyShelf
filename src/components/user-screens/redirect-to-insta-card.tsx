import * as React from "react";
import { clientId, httpsRoute } from "../../shared/constants/https";
import { InstagramIcon } from "../../static/svgs/instagram";
import { UserScreenCard } from "./user-screen-card";
import { API } from "../../client/api";
import * as Toaster from "../common/toast";


export const RedirectToInsta = () => {
  
  const redirectUri = `${httpsRoute}/instagram-auth.html`; // Should match exactly what you registered

  const openInstagramLogin = () => {
    const authUrl = `https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish&instagram_graph_user_profile`;
    window.open(authUrl, '_blank');
  };

  const handleAccessToken = async (event: MessageEvent) => {
    try {
      if (event.origin === httpsRoute) {
        const shortLivedAccessToken = event.data?.code;
        if (shortLivedAccessToken) {
          console.log(shortLivedAccessToken)
          // setShortLivedToken(code);
          const response = await API.retrieveLongLivedAccessToken(shortLivedAccessToken)
          console.log(response);
        }
      }
    } catch (e) {
      console.log(e)
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
    <UserScreenCard headerText="3. Redirect to Instagram">
      <p className="mb-3">This next step will ask you to allow this application to retrieve your media data.</p>
      <p>If you decide not to proceed here, this application will not have access to the media in your account.</p>
      <p className="mb-3">If you do, we'll be able to begin creating your portfolio right away, assuming that your Instagram and Facebook have been updated as specified in step 2.</p>
      <p>Once your ready, please login and allow permissions for this application!</p>
      <div className="flex w-full h-full items-center justify-center">
        <button 
          className="flex flex-row items-center justify-center w-fit px-6 py-2 border-4 rounded-lg gap-x-2"
          onClick={openInstagramLogin}  
        >
          <InstagramIcon />
          <span className="">Log In</span>
        </button>
      </div>
    </UserScreenCard>
  )
}