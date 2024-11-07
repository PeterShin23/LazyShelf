import * as React from "react";
import { UserScreenCard } from "./user-screen-card";

export const TermsAgreementCard = () => {
  
  return (
    <UserScreenCard headerText={"Step 1: Terms"}>
      <p>By signing up, you are agreeing to allow this application to:</p>
      <p>1. retrieve your data from Instagram,</p>
      <p>2. display your media on a public domain,</p>
      <p>3. store your Instagram media data and some of your user data to identify you.</p>
      <p>Your data will not be used for any other purpose than to display your photography portfolio.</p>
    </UserScreenCard>
  )
}