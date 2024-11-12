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
  const [step, setStep] = React.useState<number>(1);

  const containerRef = React.useRef<HTMLDivElement>(null);

  const onClick = (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') {
      return;
    }

    if (containerRef.current) {
      const { clientX } = e;
      const { left, width } = containerRef.current.getBoundingClientRect();
      const midpoint = left + width / 2;

      if (clientX < midpoint) {
        // Clicked on the left half, scroll left
        containerRef.current.scrollBy({ left: -450, behavior: 'smooth' });
        setStep(step - 1)
      } else {
        // Clicked on the right half, scroll right
        containerRef.current.scrollBy({ left: 450, behavior: 'smooth' });
        setStep(step + 1)
      }
    }
  };

  return (
    <div className="media-carousel flex-col">
      <div 
        ref={containerRef}
        className="sign-up-cards-container flex flex-row mb-5 overflow-x-scroll gap-x-5" 
        style={{
          width: "450px",
          scrollBehavior: 'smooth', // Enables smooth scrolling
        }}
        onClick={onClick}
        >
        <TermsAgreementCard />
        <ExternalSetupCard />
        <RedirectToInsta />
        <CreateAccountCard />
      </div>
    </div>
  )
  
}