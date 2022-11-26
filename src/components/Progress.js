import React, { memo, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components'
import  useCountdown  from "../hooks/useCountdown";

function Progress({
  timeInMilliSeconds,
  animationDuration,
  stopTimer,
  countDownStarted,
  countDownTime }) {

  const [minutes, seconds] = useCountdown({
    timeInMilliSeconds,
    countDownStarted,
    countDownTime
  });

  const customMinute = minutes < 10 ? `0` + minutes : minutes;
  const customSeconds = seconds < 10 ? `0` + seconds : seconds;

 
  useEffect(() => {
    if ((minutes + seconds) <= 0) {
      stopTimer();
      return;
    }
  }, [minutes, seconds])

  return (
    <div className="pg-container">

      <Pgwidget>
        <PgWidgetInner />
        <PgwidgetNumber>
          {customMinute} : {customSeconds}
        </PgwidgetNumber>

        <Circle>
          <PgwidgetBarL>
            <PgwidgetProgressLeft {...{ animationDuration, timeInMilliSeconds }} />
          </PgwidgetBarL>

          <PgwidgetBarR>
            <PgwidgetProgressRight {...{ animationDuration, timeInMilliSeconds }} />
          </PgwidgetBarR>
        </Circle>
      </Pgwidget>
    </div>
  )
}

export default memo(Progress);

const left = keyframes`100% { transform: rotate(180deg) }`;
const right = keyframes`100% { transform: rotate(180deg) }`;

const Pgwidget = styled.div`
    height: 194px;
    width: 194px;
    border-radius: 50%;
    position: relative;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
`;

const PgWidgetInner = styled.div`
    position: absolute;
    width: 174px;
    height: 174px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 100%;
    background-color: var(--default-color);
    z-index: 6;
`;

const PgwidgetNumber = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    font-size: 1.8rem;
    font-weight: 500;
    color: var(--white-col);
    font-family: "Rubik", sans-serif;
`;

const Circle = styled.div``;

const PgwidgetBarL = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    clip: rect(0px, 194px, 194px, 97px);
    border-radius: 100%;
    z-index: 1;
`;

const PgwidgetBarR = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    clip: rect(0px, 194px, 194px, 97px);
    border-radius: 100%;
    z-index: 1;
    transform: rotate(180deg)
`;

const PgwidgetProgressLeft = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    background: #fff;
    clip: rect(0px, 97px, 194px, 0px);
    border-radius: 100%;
    animation: ${props => (props.timeInMilliSeconds > 0 ? css`${left} ${props.animationDuration}s linear both` : '')} ;
  `;

const PgwidgetProgressRight = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    background: #fff;
    clip: rect(0px, 97px, 194px, 0px);
    border-radius: 100%;
    animation: ${props => (props.timeInMilliSeconds > 0 ? css`${right} ${props.animationDuration}s linear both` : '')} ;
    animation-delay: ${props => (props.timeInMilliSeconds > 0 ? css`${props.animationDuration}s ` : '')} ;
  `;