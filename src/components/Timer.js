import React, { useState, memo } from 'react'
import Actions from './Actions'
import Progress from './Progress'

function Timer() {
  const [toggleForm, setToggleForm] = useState(false);
 
  const [timeInput, setTimeInput] = useState(1);
 
  const [timeInMilliSeconds, setTimeInMilliSeconds] = useState(0);
 
  const [usedTimes, setUsedTimes] = useState([]);

  const [countDownStarted, setCountDownStarted] = useState(false);
  
  function onToggle() {
    setToggleForm(toggle => toggle = !toggleForm);
  }

  function handleChange(e) {
    const inputData = parseInt(e.target.value);
    setTimeInput(inputData);
  }

 
  const startTimer = () => {
    setCountDownStarted(true);

    if (toggleForm) {
      setToggleForm(false)
    }


    setTimeInMilliSeconds(timeInput * 60 * 1000);

    
    setUsedTimes(times => [...times, timeInput]);
  };

  const stopTimer = () => {
   
    setCountDownStarted(false);
    setTimeInMilliSeconds(0);

 
  }

  
  const countDownTime = new Date().getTime() + timeInMilliSeconds;

  const animationDuration = ((countDownTime - new Date().getTime()) / 1000) / 2;

  return (
    <div className="timer">
      <Progress {...{
        timeInMilliSeconds,
        animationDuration,
        stopTimer,
        countDownStarted,
        countDownTime
      }}
      />

      <Actions {...{
        toggleForm,
        timeInput,
        countDownStarted,
        onToggle,
        handleChange,
        startTimer,
        stopTimer,
        usedTimes,
        setUsedTimes
      }} />
    </div>
  )
}

export default memo(Timer)