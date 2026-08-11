import exercisesReducer, {
  addExercise,
  removeExercise,
} from './exercisesSlice';

describe('exercises reducer', () => {
  const initialState = ['pushups', 'burpies', 'c-up'];
  it('should handle initial state', () => {
    expect(exercisesReducer(undefined, { type: 'unknown' })).toEqual([]);
  });

  it('should handle addExercise', () => {
    const actual = exercisesReducer(initialState, addExercise('backflip'));
    expect(actual).toEqual([...initialState, 'backflip']);
  });

  it('should handle removeExercise', () => {
    const actual = exercisesReducer(initialState, removeExercise());
    expect(actual).toEqual(initialState.slice(0, initialState.length - 1));

    let removedAgain = exercisesReducer(actual, removeExercise());
    removedAgain = exercisesReducer(removedAgain, removeExercise());
    expect(removedAgain).toEqual([]);

    const minusFirst = exercisesReducer(initialState, removeExercise(0));
    expect(minusFirst).toEqual(initialState.slice(1));
  });
});
