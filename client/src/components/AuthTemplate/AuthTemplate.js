import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Label from '../Label/Label';
import Title from '../Title/Title';
import Container from '../Container/Container';
import hero from '../../images/hkk.svg';

const AuthTemplate = ({
  children, title, description, sub, text, actionText, href,
}) => (
  <Container moreStyles="bg-white space-y-2">
    <div className="bg-lightBlue w-2/5 min-h-screen text-center items-center flex justify-items-center justify-center">
      <img
        src={hero}
        alt="hero"
      />
    </div>
    <div className="w-3/5 pl-12 pr-20 py-32">
      <Title moreStyles="text-2xl mb-7" text={title} />
      <div className="text-grey text-sm leading-3">{description}</div>
      <Label htmlFor="sub" text={sub} />

      <div className="pt-5">{children}</div>
      <Link to={href}>
        <div className="text-grey text-sm mt-5">
          {text}
          <span className="text-mainBlue">{actionText}</span>
        </div>

      </Link>
    </div>

  </Container>
);

AuthTemplate.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  sub: PropTypes.string,
  children: PropTypes.node,
  href: PropTypes.string,
  actionText: PropTypes.string,
  text: PropTypes.string,
};

export default AuthTemplate;
