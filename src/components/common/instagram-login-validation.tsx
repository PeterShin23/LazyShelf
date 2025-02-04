import * as React from "react";
import { API } from "../../client/api";
import { AppActions } from "../../contexts/app-context";
import useAppContext from "../../hooks/app-hook";
import { ContainerView } from "../../shared/enums/fe";
import { InstagramIcon } from "../../static/svgs/instagram";
import * as Toaster from "../common/toast";

export enum InstagramValidationFlow {
  SignUp = 1,
  SignIn = 2,
}

type InstagramLoginValidationProps = {
  validationFlow: InstagramValidationFlow;
}

export const InstagramLoginValidation = ({ validationFlow } : InstagramLoginValidationProps) => {
  const { state, dispatch } = useAppContext();

  const [formValues, setFormValues] = React.useState({
    instagramUsername: "",
  });
  const [onInstagramLoginHover, setOnInstagramLoginHover] = React.useState<boolean>(false);
  const [isUsernameValidationError, setIsUsernameValidationError] = React.useState<string>("");
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value.trim() })
  };

  const isInstagramRedirectDisabled = React.useMemo(() => {
    return !!formValues.instagramUsername
  }, []);

  const redirectUri = `${process.env.APP_URL}/instagram-auth.html`; // Should match exactly what you registered

  const openInstagramLogin = () => {
    try {
      setIsProcessing(true);

      if (!formValues.instagramUsername) {
        setIsUsernameValidationError("Missing username.");
        return;
      }
  
      if (!state.enabledIgUsers.includes(formValues.instagramUsername)) {
        setIsUsernameValidationError("Currently beta-testing.");
        return;
      }
  
      // CHECK HERE FOR EXISTENCE IN AWS WHEN IN SIGNIN FLOW
      if (validationFlow === InstagramValidationFlow.SignUp) {
        setIsUsernameValidationError("Authorization failed! Please contact the developer")
        return;
      }
  
      const authUrl = `https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=${process.env.INSTAGRAM_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish&instagram_graph_user_profile`;
      window.open(authUrl, '_blank');
    } catch (err) {
      Toaster.error("Failed to open Instagram validation!")
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAccessToken = async (event: MessageEvent) => {
    if (!isProcessing) return;

    try {
      // Validate the origin of the message
      if (event.origin !== process.env.APP_URL) {
        console.warn('Origin mismatch:', event.origin);
        return;
      }

      const shortLivedAccessToken = event.data?.code;

      if (!shortLivedAccessToken) {
        throw new Error("Authorization code not received!");
      }
      
      if (validationFlow === InstagramValidationFlow.SignIn) {
        dispatch({
          type: AppActions.SetSignedIn,
          payload: true
        });
        dispatch({
          type: AppActions.SetContainerView,
          payload: ContainerView.MediaDisplay
        })
      } else {

        // TODO: Add back in after deployment
        return;
        // const response = await API.createUser(shortLivedAccessToken);
        // const response = await API.retrieveLongLivedAccessToken(shortLivedAccessToken)
      }
    } catch (e) {
      Toaster.error(state.uiColor, "Something went wrong!")
    }
  };

  React.useEffect(() => {
    window.addEventListener('message', handleAccessToken);

    return () => {
      window.removeEventListener('message', handleAccessToken);
    };
  }, []);

  return (
      <div className="flex flex-col w-full h-full items-center justify-center">
        <div className="flex flex-col justify-left mb-2">
          <label className="flex flex-col mb-4">
            <span className="font-medium font-size-sm ml-2 mb-2">Instagram Username</span>
            <input 
                type="text"
                name="instagramUsername"
                value={formValues.instagramUsername}
                onChange={handleChange}
                placeholder="Type here..."
                className="py-2 px-4 rounded-lg font-medium min-w-72"
                style={{ 
                    outline: "none"
                }}
            />
            <span className="text-red-500 text-xs ml-2">{isUsernameValidationError}</span>
          </label>
        </div>
        <button 
          className="flex flex-row items-center justify-center w-fit px-6 py-2 rounded-lg border-2 gap-x-2"
          style={{
            borderColor: onInstagramLoginHover ? "#0081FB" : "#0081FB",
            color: onInstagramLoginHover ? "white" : "#0081FB",
            backgroundColor: onInstagramLoginHover ? "#0081FB" : undefined,
            transform: onInstagramLoginHover ? "scale(1.2)" : "scale(1)",
            transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out',
          }}
          onClick={openInstagramLogin}
          onMouseEnter={() => setOnInstagramLoginHover(true)}
          onMouseLeave={() => setOnInstagramLoginHover(false)}
          disabled={isInstagramRedirectDisabled}  
        >
          <InstagramIcon 
            strokeColor={onInstagramLoginHover ? "white" : "#0081FB"}
            onClick={() => {}}  
          />
          <span className="">Log In</span>
        </button>
      </div>
  )
}
