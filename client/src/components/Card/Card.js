import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ children, cardStyle, moreStyles }) => (
  <div className={`${cardStyle} ${moreStyles}`}>
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.element,
  cardStyle: PropTypes.string,
  moreStyles: PropTypes.string,
};

Card.defaultProps = {
  cardStyle: 'w-60 h-40 rounded-md bg-lightBlue p-6 text-grey text-center',
};
export default Card;
