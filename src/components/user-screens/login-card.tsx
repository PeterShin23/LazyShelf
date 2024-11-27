import * as React from "react";
import { colorPairs } from "../../constants/colors";
import { AppActions } from "../../contexts/app-context";
import useAppContext from "../../hooks/app-hook";
import { ContainerView } from "../../shared/enums/fe";
import { InstagramLoginValidation, InstagramValidationFlow } from "../common/instagram-login-validation";

export const LoginCard = () => {
  const { state, dispatch } = useAppContext();

  return (
    <div className="media-carousel flex-col">
      <div 
        className="sign-up-cards-container flex flex-row mb-5 overflow-x-scroll gap-x-5" 
        style={{
          width: "450px",
          scrollBehavior: 'smooth', // Enables smooth scrolling
        }}
        >
      <div 
      className="user-screen-card flex flex-shrink-0 flex-col bg-white rounded-lg p-4 overflow-y-auto whitespace-normal"
      style={{
        width: "100%",
        height: "250px",
        backgroundColor: colorPairs[state.uiColor].light
      }}>
        <div className="relative mb-6">
          <button 
            className="absolute right-0 top-0"
            onClick={() => {
              dispatch({
                type: AppActions.SetContainerView,
                payload: ContainerView.MediaDisplay
              })
            }}
            >x</button>
        </div>
        <InstagramLoginValidation validationFlow={InstagramValidationFlow.SignIn} />
    </div>
    </div>
    </div>
  )
  
}