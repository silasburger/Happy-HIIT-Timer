import { useSelector, useDispatch } from 'react-redux';
import { removeExercise, setExercises } from './exercisesSlice';
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ReactComponent as GripIcon } from '../../assets/grip.svg';

const DRAG_TYPE = 'EXERCISE';

const reorder = (sourceIdx, destinationIdx, list) => {
  const result = [...list];
  const dragItem = list[sourceIdx];
  const [swappedOut] = result.splice(destinationIdx, 1, dragItem);
  result.splice(sourceIdx, 1, swappedOut);
  return result;
};

const ExercisesList = () => {
  const exercises = useSelector((state) => state.exercises);
  const dispatch = useDispatch();

  const moveCardHandler = (dragIndex, hoverIndex) => {
    const dragItem = exercises[dragIndex];

    if (dragItem) {
      const updatedExercises = reorder(dragIndex, hoverIndex, exercises);
      dispatch(setExercises(updatedExercises));
    }
  };

  const [, drop] = useDrop(() => ({ accept: DRAG_TYPE }));

  return (
    <div className="overflow-x-auto py-2">
      <div ref={drop}>
        {exercises.map(({ name, id }, idx) => (
          <Exercise
            moveCardHandler={moveCardHandler}
            name={name}
            key={id}
            index={idx}
            id={id}
          />
        ))}
      </div>
    </div>
  );
};

export const Exercise = ({ name, id, index, moveCardHandler }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeExercise(index));
  };

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: DRAG_TYPE,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCardHandler(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { index, name },
    type: DRAG_TYPE,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const { id: droppedId, originalIndex } = item;
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        moveCardHandler(droppedId, originalIndex);
      }
    },
  });

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity }}
      className="border border-black flex justify-between my-1 p-2 truncate items-center bg-gray-100 text-charcoal"
    >
      <GripIcon />
      {name}
      <button onClick={handleRemove}>X</button>
    </div>
  );
};

export default ExercisesList;
