import * as React from "react";
import { UserScreenCard } from "./user-screen-card";

export const ExternalSetupCard = () => {
  
  return (
    <UserScreenCard headerText="Step 2: Complete these steps first!">
      <p>Meta doesn't make it easy for me to create your portfolio.</p>
      <p>It's a bit tedious to set it up, but once it's set up, no other set up is required!</p>
      <p>1. Change your Instagram account to a Creator account.</p>
      <p>Meta only allows Creator and Business accounts to be accessible for some reason :&#40;</p>
      <p>But you're a creator and you should show that. If you don't want this label to be public, Instagram allows you to hide it!</p>
      <p>2. Create a Facebook business page. Link it to your Instagram account.</p>
      <p>From me: "Why Meta? Please make this easier."</p>
      <p>Finish this step, and let's get you set up for your personal photography portfolio!</p>
    </UserScreenCard>
  )
}