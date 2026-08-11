import React from 'react';

const IntervalForm = ({ inputVals, handleFormChange, increment }) => {
  return (
    <>
      <IntervalInput
        value={inputVals.interval}
        handleFormChange={handleFormChange}
        increment={increment}
        name="interval"
        label="Interval length in seconds"
      />

      <RatioInput handleFormChange={handleFormChange} value={inputVals.ratio} />

      <IntervalInput
        value={inputVals.longBreak}
        handleFormChange={handleFormChange}
        increment={increment}
        name="longBreak"
        label="Break between sets in seconds"
      />
    </>
  );
};

export const IntervalInput = ({
  increment,
  handleFormChange,
  value,
  name,
  label,
}) => {
  return (
    <>
      <div className="form-control py-2">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <div className="input-group">
          <button onClick={() => increment(-10, name)} className="btn ">
            -
          </button>
          <input
            value={value}
            onChange={handleFormChange}
            name={name}
            type="number"
            className="input input-bordered w-full"
          />
          <button className="btn" onClick={() => increment(+10, name)}>
            +
          </button>
        </div>
      </div>
    </>
  );
};

export const RatioInput = ({ handleFormChange, value }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">Work / rest ratio</span>
      </label>
      <input
        onChange={handleFormChange}
        name="ratio"
        type="range"
        min="0"
        max="1"
        value={value}
        step="0.01"
        className="range"
      />
      <div className="w-full flex justify-between text-xs px-2">
        <span>0</span>
        <span>100</span>
      </div>
    </div>
  );
};

export default IntervalForm;
