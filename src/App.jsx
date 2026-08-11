import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import ExercisesPage from './features/exercises/ExercisesPage';
import IntervalsPage from './features/intervals/IntervalsPage';
import TimerPage from './features/timer/TimerPage';
import { setExercises } from './features/exercises/exercisesSlice';
import { setIntervals } from './features/intervals/IntervalsSlice';
import './App.css';

const App = () => {
  const dispatch = useDispatch();

  const stateSetter = useCallback((exercises, intervals) => {
    if (exercises) dispatch(setExercises(JSON.parse(exercises)));
    if (intervals) dispatch(setIntervals(JSON.parse(intervals)));
    else dispatch(setIntervals({longBreak: 90, interval: 60, ratio: 0.75}));
  }, [dispatch])

  useEffect(() => {
    const exercises = localStorage.getItem('exercises');
    const intervals = localStorage.getItem('intervals');
    stateSetter(exercises, intervals);
  }, [stateSetter]);

  return (
    <Routes>
      <Route path="/exercises" element={<ExercisesPage />} />
      <Route path="/intervals" element={<IntervalsPage />} />
      <Route path="/timer" element={<TimerPage />} />
      <Route path="*" element={<Navigate to="/exercises" />} />
    </Routes>
  );
};

export default App;
