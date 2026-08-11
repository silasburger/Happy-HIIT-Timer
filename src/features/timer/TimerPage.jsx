import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import shortBeep from '../../assets/shortAlert.mp3';
import longBeep from '../../assets/longAlert.mp3';
import PageLayout from '../../components/PageLayout';
import './timerPage.css';
import truncate from '../../utils/truncate'

/*
- set interval for every second or milisecond
- have time variable
- track sets. Use to find to display which exercise we are on.
- each set has rest and work timers in that order
*/

const TimerPage = () => {
  const { intervals, exercises } = useSelector(({ intervals, exercises }) => ({
    intervals: intervals.times,
    exercises,
  }));

  const longAlert = useRef(new Audio(longBeep));
  const shortAlert = useRef(new Audio(shortBeep));

  const [phase, setPhase] = useState('rest');
  const [time, setTime] = useState(null);
  const [icount, setIcount] = useState(1);
  const [isRunning, setRunning] = useState(false);
  const [isSoundOn, setSound] = useState(true);

  const toggleRunning = () => {
    setRunning((isRunning) => !isRunning);
  };

  const reset = () => {
    setRunning(false);
    setPhase('rest');
    setIcount(1);
    setTime(intervals['rest']);
  };

  const getNextPhase = (phase, intervalCount, numExercises) => {
    if (phase === 'rest' || phase === 'longBreak') {
      return 'work';
    } else if (intervalCount % numExercises === 0) {
      return 'longBreak';
    } else {
      return 'rest';
    }
  };

  // listen to changes after loading local storage
  useEffect(() => {
    setTime(intervals[phase]);
  }, [intervals, phase]);

  const playSounds = useCallback(
    (time) => {
      if (isRunning) {
        if (time === 4 || time === 3 || time === 2) {
          shortAlert.current.play();
        }
        if (time === 1) {
          longAlert.current.play();
        }
      }
    },
    [isRunning]
  );

  // listen to timer
  useEffect(() => {
    if (isSoundOn && time <= 5) {
      playSounds(time, isRunning);
    }
    if (time !== null && time < 1) {
      // triggering from default values
      const nextPhase = getNextPhase(phase, icount, exercises.length);
      if (nextPhase !== 'work') {
        setIcount(icount + 1);
      }
      setTime(intervals[nextPhase]);

      setPhase(nextPhase);
    }
  }, [
    time,
    icount,
    intervals,
    exercises.length,
    isRunning,
    isSoundOn,
    playSounds,
    phase,
  ]);

  const tick = () => {
    setTime((time) => time - 1);
  };

  // set phase timer
  useEffect(() => {
    // handle pauses
    if (isRunning) {
      const id = setInterval(tick, 1000);
      return () => {
        clearInterval(id);
      };
    }
  }, [isRunning]);

  const progressColor = phase === 'rest' ? 'accent' : 'info';
  const percentComplete = (time / intervals[phase]) * 100;
  const progress = phase !== 'work' ? percentComplete : 100 - percentComplete;

  const textDecoration = isSoundOn ? null : 'line-through';

  return (
    <PageLayout page="timer">
      {time === null ? null : (
        <div className="content-wrapper">
          <progress
            className={`progress progress-${progressColor} h-full`}
            value={progress}
            max="100"
          ></progress>
          <div className="text-9xl flex">
            <div className="w-3/12 flex justify-end items-center text-2xl"></div>
            <div className="flex grow justify-center items-center">{Math.ceil(time)}</div>
            <div className="w-3/12 flex justify-center items-center text-xl">{phase === 'longBreak' ? 'BREAK' : phase.toUpperCase()}</div>
          </div>
          <div className="flex justify-around">
            {exercises.length ? (
              <div className="w-full h-16 flex items-center set-info">
                <div className="w-9/12 h-full text-center bg-gray-100 text-charcoal">
                  {truncate(exercises[(icount - 1) % exercises.length].name, 20)}
                </div>
                <div className="w-3/12 h-full text-center bg-gray-200 text-charcoal">
                  {icount + '/' + exercises.length}
                </div>
              </div>
            ) : null}
          </div>
          <div className="flex justify-around my-4">
            <button
              className="btn btn-primary rounded-none"
              onClick={() => toggleRunning()}
            >
              {isRunning ? 'Pause' : 'Play'}
            </button>
            <button className="btn btn-secondary rounded-none" onClick={reset}>
              Reset
            </button>
            <button
              className={`${textDecoration} btn rounded-none`}
              onClick={() => setSound((s) => !s)}
            >
              Sound
            </button>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default TimerPage;
