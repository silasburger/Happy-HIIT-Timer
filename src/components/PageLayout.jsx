import React from 'react';
import { useNavigate } from 'react-router-dom';

const nextPageMap = {
  exercises: '/intervals',
  intervals: '/timer',
};

const prevPageMap = {
  intervals: '/exercises',
  timer: '/intervals',
};

const PageLayout = (props) => {
  const navigate = useNavigate();
  const navigateToNext = () => {
    navigate(nextPageMap[props.page]);
  };
  const navigateToPrevious = () => {
    navigate(prevPageMap[props.page]);
  };

  const buttonType = props.page === 'timer' ? 'primary' : 'ghost';

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-sm w-full">
        <nav className="navbar bg-gray-200">
          <div className="navbar-start">
            {props.page === 'exercises' ? null : (
              <button
                onClick={navigateToPrevious}
                className={`btn btn-${buttonType} btn-circle`}
              >
                {'<'}
              </button>
            )}
          </div>
          <div className="navbar-center">
            <span className="text-xl text-charcoal">Happy HIIT Timer</span>
          </div>
          <div className="navbar-end">
            {props.page !== 'timer' ? (
              <button
                onClick={navigateToNext}
                className="btn btn-primary btn-circle"
              >
                {'>'}
              </button>
            ) : null}
          </div>
        </nav>
        <div className={`${props.page}-page p-3`}>
          <div className="page-content-wrapper">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
