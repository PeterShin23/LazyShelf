import React from 'react';
import './App.css';
import './style.less'
import { StartLoadingScreen } from './components/common/start-loading-screen';

const App = () => {
  const [text, setText] = React.useState<string>("before click");
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setTimeout(() => setIsLoading(false), 4000)
  }, []);

  return (
    <div
      id="showcase-container"
      className="app-font">
      {isLoading ? <StartLoadingScreen /> 
        : (
          <div>
          <button 
            className="text-white bg-black"
            onClick={() => setText("Welcome to my showcase")}
          >
            Click me to change
          </button>
          <p className="text-blue-700">{text}</p>
        </div>
        )}
    </div>
  );
}

export default App;
