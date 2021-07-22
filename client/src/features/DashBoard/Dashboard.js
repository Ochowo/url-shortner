import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
import NavBar from '../../components/NavBar/NavBar';
import Card from '../../components/Card/Card';
import Table from '../../components/Table/Table';
import Button from '../../components/Button/Button';
import { shortenUrl, urlSelector, fetchUrls } from './urlSlice';
import { authSelector } from '../Signup/signUpSlice';
import Toast from '../../components/Toast/Toast';

const Dashboard = () => {
  const {
    hasErrors, error,
  } = useSelector(authSelector);
  const {
    urls,
    isLoading,
    numClicks, created,
    // created,
  } = useSelector(urlSelector);
  console.log('firstUrl', urls);
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const savedData = urls !== null && urls !== undefined && urls.data.length > 0 ? urls.data : [];
  const [urlList, setUrlList] = useState(savedData);
  // const [load, setLoad] = useState(false);
  const {
    user,
  } = useSelector(authSelector);
  console.log('clicked', urls);
  const handleClick = () => {
    if (value.length > 0) {
      dispatch(shortenUrl({
        url: value,
        userId: user.userId,
      }));
    }
    setUrlList(savedData);
  };
  useEffect(() => {
    console.log('called');
    dispatch(fetchUrls(user.userId));
    setUrlList(savedData);
    console.log('here', urls, urlList);
  }, []);
  useEffect(() => {
    console.log('called');
    dispatch(fetchUrls(user.userId));
    setUrlList(savedData);
    console.log('here', urls, urlList);
  }, [created]);

  console.log(urlList);
  return (
    <>
      <NavBar />
      <div className="w-full mx-auto px-20 mt-10">
        <div className="flex flex-row justify-between space-x-8 rounded-md">
          <div className="flex flex-row space-x-4">
            <Card>
              <div>Total number of urls</div>
              <div className="font-medium text-darkGrey mt-6 text-5xl">{urls !== null && urls.data.length > 0 ? urls.data.length : 0 }</div>
            </Card>
            <Card>
              <div>Total number of clicks</div>
              <div className="font-medium text-darkGrey mt-6 text-5xl">{numClicks}</div>
            </Card>
          </div>
          <div className="flex flex-row mb-4 space-x-4 bg-lightBlue w-full px-6 items-center h-40">
            <input className="w-4/5 h-12 border border-grey font-medium p-2 rounded-md form-input focus:focus-input" type="text" onChange={(event) => setValue(event.target.value)} id="lname" name="lname" />
            <Button
              className="bg-mainBlue rounded text-white text-sm px-8 h-12"
              onClick={() => handleClick()}
              text={isLoading ? (
                <ReactLoading
                  type="spin"
                  color="#ffffff"
                  height={40}
                  width={40}
                />
              ) : 'Shorten'}
            />

          </div>
        </div>

        <div className="mt-12">
          {hasErrors && <Toast hasErrors={hasErrors} error={error} isLoading={isLoading} />}
          <Table products={urlList} />
        </div>

      </div>
    </>
  );
};
export default Dashboard;
