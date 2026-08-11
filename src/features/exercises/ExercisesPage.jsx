import React, { useEffect, useState } from 'react';
import ExercisesList from './ExercisesList';
import ExercisesInput from './ExercisesInput';
import { useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import PageLayout from '../../components/PageLayout';

const ExercisesPage = () => {
  const exercises = useSelector((s) => s.exercises);
  const [updateOk, setUpdateOk] = useState(false);

  useEffect(() => {
    setUpdateOk(true);
  }, []);

  useEffect(() => {
    if (updateOk) localStorage.setItem('exercises', JSON.stringify(exercises));
  }, [exercises, updateOk]);

  const isMobile = window.innerwidth < 600;

  return (
    <PageLayout title="Exercises" page="exercises">
        <ExercisesInput />
        <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
          <ExercisesList />
        </DndProvider>
    </PageLayout>
  );
};

export default ExercisesPage;
