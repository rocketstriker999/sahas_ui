// CustomErrorPage.js
import React from 'react';
import PropTypes from 'prop-types';

function CustomError({ highlight }) {

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{highlight}</i>
      </p>
    </div>
  );
}

CustomError.propTypes = {
  highlight: PropTypes.string,
};

export default CustomError;
