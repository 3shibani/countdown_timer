import React from 'react';
import './style.css';

/* Components */
import Onboarding from "./components/Onboarding";
import Timer from "./components/Timer";

function App() {
  return (
    <div className="container">
      <Onboarding />
      <Timer />
    </div>
  );
}

export default App;