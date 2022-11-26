import React, { memo, useState, useEffect } from 'react'

function Actions({
    toggleForm,
    timeInput,
    countDownStarted,
    onToggle, 
    handleChange,
    startTimer,
    stopTimer,
    usedTimes,
    setUsedTimes }) {

    const [mostUsedObj, setMostUsedObj] = useState([]);

    function onReset() {
        setMostUsedObj([]);
        setUsedTimes([]);
    }

    useEffect(() => {

        let numMap = {};

        usedTimes.forEach(function (num) {
            if (numMap[num]) {
                numMap[num]++;
            } else {
                numMap[num] = 1;
            }
        });


        //sort function
        let sortable = [];
        for (var num in numMap) {
            sortable.push([num, numMap[num]]);
        }

        sortable.sort(function (a, b) {
            return a[1] - b[1];
        });



        setMostUsedObj(sortable.reverse())

    }, [usedTimes])

    return (
        <div className="ac-container">
            <div className="btn-container">
                {!countDownStarted ?
                    <button onClick={startTimer}>Start</button> :
                    <button onClick={stopTimer}>Stop</button>}
                <button onClick={onToggle}>Set Time</button>
            </div>

            {toggleForm ?
                <div className="input-form">
                    <input type="number" defaultValue={timeInput.toString()} placeholder="enter time" name="time" onChange={handleChange} />
                </div>
                : null}

            <div className="used-container">
                <div className="used-timers">
                    <h2>Most used timers</h2>
                    <ul>
                        {mostUsedObj.map((time) => (<li key={time}>
                            <button> {time[0]} mins</button> </li>))}

                    </ul>
                </div>

                <div className="reset">
                    <button onClick={onReset}>Clear</button>
                </div>
            </div>
        </div>
    )
}

export default memo(Actions)