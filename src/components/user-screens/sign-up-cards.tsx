import * as React from "react";
import { CreateAccountCard } from "./create-account-card";
import { ExternalSetupCard } from "./external-setup-card";
import { RedirectToInsta } from "./redirect-to-insta-card";
import { SetUpFinishedCard } from "./set-up-finished-card";
import { TermsAgreementCard } from "./terms-agreement-card";

export enum SignUpStep {
  TermsAgreement = 1,
  ExternalSetup = 2,
  CreateAccount = 3,
  RedirectToInsta = 4,
  Finished = 5,
}

export const SignUpCards = () => {
  return (
    <div className="media-carousel flex-col">
      <div className="sign-up-cards-container flex flex-row mb-5 overflow-x-scroll gap-x-5" 
        style={{
          width: "450px"
        }}>
        <TermsAgreementCard />
        <ExternalSetupCard />
        <CreateAccountCard />
        <RedirectToInsta />
        <SetUpFinishedCard />
      </div>
    </div>
  )
  
}