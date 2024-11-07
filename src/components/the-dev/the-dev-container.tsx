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
          <LinkedInIcon />
          <InstagramIcon />
        </div>
      </div>
      <div className="flex w-1/2 flex-col text-left font-extralight">
        <p>My name is Peter, and I'm a software engineer and wannabe photographer.</p>
        <br />
        <p>For my fellow people in the Tech Industry, I am:</p>
        <ul className="ml-4">
          <li>1. a Full Stack Engineer.</li>
          <li>2. with 2 Years of Experience.</li>
          <li>3. and have a passion for taking on challenging tasks that teach me new things.</li>
        </ul>
        <br />
        <p>Skills applied doing this project include React Typescript, Server-Side Rendering, TailwindCSS, AWS, GO &#40;backend&#41;, and photography :&#41;</p>
        <br />
        <p>For my fellow photographers, my photography inspirations are:</p>
        <ul className="ml-4">
          <li>1. Nature in the cities.</li>
          <li>2. Moments with friends.</li>
          <li>3. Remembering my family.</li>
        </ul>
        <br />
        Reach out, I'd love to connect and have a conversation!
      </div>
    </section>
  )
}