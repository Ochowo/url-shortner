import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../../components/NavBar/NavBar';
import Button from '../../components/Button/Button';
import { shortenNoAuthUrl, urlSelector, fetchnoAuthUrls } from '../DashBoard/urlSlice';
import Table from '../../components/Table/Table';
import Toast from '../../components/Toast/Toast';

const Home = () => {
  const {
    isAuthenticated,
  } = useSelector(urlSelector);
  const {
    noAuthUrls,
    isLoading,
    hasErrors, error, created,
  } = useSelector(urlSelector);
  const dispatch = useDispatch();
  const savedData = noAuthUrls !== null && noAuthUrls !== undefined
  && noAuthUrls.data?.length > 0 ? noAuthUrls.data : [];
  const [urlList, setUrlList] = useState(savedData);
  const [value, setValue] = useState('');

  const handleClick = () => {
    if (value.length > 0) {
      dispatch(shortenNoAuthUrl({
        url: value,
      }));
    }
    setUrlList(savedData);
  };
  useEffect(() => {
    dispatch(fetchnoAuthUrls());
    setUrlList(savedData);
  }, [isAuthenticated, created]);
  return (
    <>
      <NavBar />
      <div className="w-full mx-auto px-20 mt-10">
        <div>
          <h2 className="text-4xl font-bold mb-2 text-grey">
            Create your own unique url!
          </h2>
          <div className="flex flex-row mb-4 space-x-4 bg-lightBlue w-full px-6 items-center h-40">
            <input className="w-4/5 h-12 border border-grey font-medium p-2 rounded-md form-input focus:focus-input" type="text" onChange={(event) => setValue(event.target.value)} id="lname" name="lname" />
            <Button
              className="bg-mainBlue rounded text-white text-sm px-8 h-12"
              onClick={() => handleClick()}
              text="Shorten"
            />

          </div>
        </div>
        <div className="mt-12">
          {hasErrors && <Toast hasErrors={hasErrors} error={error} />}
          <Table products={urlList} isLoading={isLoading} noAuth />
        </div>
      </div>
    </>
  );
};
export default Home;
