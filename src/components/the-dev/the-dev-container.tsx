import * as React from "react";
import useAppContext from "../../hooks/app-hook";
import { colorPairs } from "../../constants/colors";
import { LinkedInIcon } from "../../static/svgs/linkedin";
import { InstagramIcon } from "../../static/svgs/instagram";
const pfp = require('../../static/images/pfp.jpg');

export const TheDevContainer = () => {
  const { state, dispatch } = useAppContext();
  const { uiColor } = state;

  const [pfpLoaded, setPfpLoaded] = React.useState<boolean>(false);
  const [onLinkedinHover, setOnLinkedinHover] = React.useState<boolean>(false);
  const [onInstagramHover, setOnInstagramHover] = React.useState<boolean>(false);

  return (
    <section className="flex flex-row items-center mx-32 mt-8 gap-x-12"
      style={{
        height: "calc(100vh - 94px)"
      }}
    >
     <div className="flex flex-col w-1/2 justify-center">
        <div 
          className="relative flex flex-shrink justify-center items-center size-96 rounded-full mx-auto overflow-hidden"
          style={{ 
           }}
        >
          <img 
            src={pfp} 
            alt="Dev Profile Picture" 
            className={`absolute inset-0 h-full w-full object-cover transition-opacity ${pfpLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{
              transitionDuration: "1500ms",
            }}
            onLoad={() => setPfpLoaded(true)}
            loading="lazy"
            />
        </div>
        <div className="flex flex-row items-center justify-center gap-x-8 pt-6">
          <div
            onMouseEnter={() => setOnLinkedinHover(true)}
            onMouseLeave={() => setOnLinkedinHover(false)}
            style={{
              transform: onLinkedinHover ? "scale(1.3)" : "scale(1)",
              transition: "transform 0.15s ease-in-out",
            }}
            >
            <LinkedInIcon fillColor={onLinkedinHover ? "#0a66c2" : "black"} />
          </div>
          <div
            onMouseEnter={() => setOnInstagramHover(true)}
            onMouseLeave={() => setOnInstagramHover(false)}
            style={{
              transform: onInstagramHover ? "scale(1.3)" : "scale(1)",
              transition: "transform 0.15s ease-in-out",
            }}
          >
            <InstagramIcon strokeColor={onInstagramHover ? "#0081FB" : "black"} />
          </div>
        </div>
      </div>
      <div 
        className="flex w-1/2 flex-col text-left font-extralight font-size-sm"
        style={{
          color: colorPairs[state.uiColor].darkest,
        }}
      >
        <p>My name is Peter, and I'm a software engineer and wannabe photographer.</p>
        <br />
        <p>For my fellow people in the Tech Industry, I am:</p>
        <ul className="ml-4">
          <li>1. a Full Stack Software Engineer.</li>
          <li>2. been in the industry since 2022.</li>
          <li>3. and have a passion for taking on challenging tasks that teach me new things.</li>
        </ul>
        <br />
        <p>Skills applied doing this project include React Typescript, Server-Side Rendering, TailwindCSS, AWS, GO &#40;backend&#41;, and photography :&#41;</p>
        <br />
        <p>For my fellow photographers, I use a Lumix S5II as my main camera. My photography inspirations are:</p>
        <ul className="ml-4">
          <li>1. nature in the cities.</li>
          <li>2. moments with friends.</li>
          <li>3. memories of my family.</li>
        </ul>
        <br />
        Reach out, I'd love to connect and have a conversation!
      </div>
    </section>
  )
}