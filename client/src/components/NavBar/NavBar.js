import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, logout } from '../../features/Signup/signUpSlice';
import logo from '../../images/logo.svg';
import Button from '../Button/Button';
import { clearData } from '../../features/DashBoard/urlSlice';

const NavBar = () => {
  const { isAuthenticated } = useSelector(authSelector);
  const dispatch = useDispatch();
  const onClick = async () => {
    dispatch(logout());
    dispatch(clearData());
  };
  return (
    <>
      <header className="header uyu">
        <nav className="flex flex-row justify-between w-full bg-white shadow px-8 items-center py-2">
          <div className="w-32">
            <Link to="/home">
              <img
                src={logo}
                alt="logo"
              />
            </Link>
          </div>
          <div className="flex flex-row space-x-4 items-center">
            {isAuthenticated ? (
              <>
                {' '}
                <div className="text-grey font-medium text-sm">Welcome Ochowo!</div>
                <Button className="bg-mainBlue rounded text-white text-sm px-8 py-2" text="Logout" onClick={onClick} />
              </>
            ) : (
              <>
                {' '}
                <Link to="/signin">
                  <div className="text-grey text-sm px-8 py-1 font-medium">
                    Login
                  </div>
                </Link>
                <Link to="/signup">
                  <div className="bg-mainBlue rounded text-white text-sm px-8 py-2">
                    Signup
                  </div>
                </Link>
              </>
            )}

          </div>

        </nav>
      </header>

    </>
  );
};

export default NavBar;
