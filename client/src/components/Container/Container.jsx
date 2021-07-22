import React from 'react';
import PropTypes from 'prop-types';

const Container = ({
  children,
  flexDirection,
  justifyContent,
  moreStyles,
}) => (
  <div
    className={
        `flex ${flexDirection} ${justifyContent} ${moreStyles}`
      }
  >
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
  moreStyles: PropTypes.string,
  justifyContent: PropTypes.oneOf([
    'justify-between',
    'justify-start',
    'justify-end',
    'justify-center',
    'justify-around',
    'justify-evenly',
  ]),
  flexDirection: PropTypes.oneOf([
    'flex-row',
    'flex-row-reverse',
    'flex-col',
    'flex-col-reverse',
  ]),
};

Container.defaultProps = {
  flexDirection: 'flex-row',
  justifyContent: 'justify-between',
};

export default Container;
