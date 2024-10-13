import { API } from "../client/api";
import * as React from "react";
import { StartLoadingScreen } from "./common/start-loading-screen";

export const ShowCaseContainer = () => {
  const [text, setText] = React.useState<string>("before click");
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const apiResponse = API.getDataFromServer().then(res => console.log(res));

    const timerId = setTimeout(() => setIsLoading(false), 2500)

    return () => clearTimeout(timerId);
  }, []);

  return (
    <div className="app-font">
      {isLoading ? <StartLoadingScreen />
      : (
          <div>
            <button 
              className="text-white bg-black"
              onClick={() => {
                setText("Welcome to my showcase")
              }}
            >
              Click me to change
            </button>
            <p className="text-blue-700">{text}</p>
          </div>
        )}
    </div>
  )
}