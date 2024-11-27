import * as React from "react";

import { UserScreenCard } from "./user-screen-card";
import { InstagramLoginValidation, InstagramValidationFlow } from "../common/instagram-login-validation";

export const RedirectToInsta = () => {
  return (
    <UserScreenCard headerText="3. Redirect to Instagram">
      <p className="mb-3">This next step will ask you to allow this application to access data from your Instagram.</p>
      <p className="mb-3">If you decide not to proceed here, this application will not have access to the media in your account.</p>
      <p>Once you're ready, please log in to Instagram and allow permissions for this application!</p>
      <InstagramLoginValidation validationFlow={InstagramValidationFlow.SignUp} />
    </UserScreenCard>
  )
}