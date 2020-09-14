import React from 'react';
import PropTypes from 'prop-types';

PageNotFound.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

function PageNotFound(props) {
  return (
    <>
      <button
        type="button"
        onClick={() => {
          props.history.push({
            pathname: '/',
          });
        }}
        className="btn"
      >
        Go home
      </button>
      <h2 className="descr">Page not found ......</h2>
    </>
  );
}
export default PageNotFound;
