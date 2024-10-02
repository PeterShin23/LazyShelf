import React from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [text, setText] = React.useState<string>("before click");

  return (
    <div>
      <button 
        className="text-white bg-black"
        onClick={() => setText("now changed can't go back")}
      >
        Click me to change
      </button>
      <p className="text-blue-700">{text}</p>
    </div>
  );
}

export default App;
