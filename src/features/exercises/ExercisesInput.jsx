import React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addExercise } from './exercisesSlice';

const ExercisesInput = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  const handleAddExercise = evt => {
    evt.preventDefault();
    if (input !== '') {
      dispatch(addExercise(input));
      setInput('');
    }
  };

  return (
    <form onSubmit={handleAddExercise} className="form-control">
      <div className="input-group">
        <input
          minLength="1"
          maxLength="30"
          value={input}
          onChange={(evt) => setInput(evt.target.value)}
          type="text"
          placeholder="Add exercise"
          className="input input-bordered w-full"
        />
        <button className="btn btn-square">
          +
        </button>
      </div>
    </form>
  );
};

export default ExercisesInput;
