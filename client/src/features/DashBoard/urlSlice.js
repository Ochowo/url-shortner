/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import api from '../../helpers/api';

const urlSlice = createSlice({
  name: 'url',
  initialState: {
    isLoading: false,
    hasErrors: false,
    urls: null,
    error: null,
    created: false,
    redirectTo: null,
    numClicks: 0,
  },
  reducers: {
    getUrls: (state, action) => {
      state.isLoading = false;
      state.urls = action.payload;
    },
    setClicks: (state, action) => {
      state.isLoading = false;
      state.numClicks = action.payload;
    },
    loading: (state) => {
      state.created = false;
      state.isLoading = true;
    },
    createUrls: (state, action) => {
      state.isLoading = false;
      state.urls = action.payload;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.hasErrors = true;
      state.error = action.payload;
      state.isLoading = false;
    },
    urlCreated(state) {
      state.created = true;
    },
    reset(state) {
      state.isLoading = false;
      state.hasErrors = false;
      state.urls = null;
      state.error = null;
      state.created = false;
      state.redirectTo = null;
      state.numClicks = 0;
    },
    urlRedirect: (state, action) => {
      state.redirectTo = action.payload;
    },
  },
});

export const {
  loading, getUrls, createUrls, setError, urlCreated, urlRedirect, setClicks, clearUrl, reset,
} = urlSlice.actions;
export const urlSelector = (state) => state.url;
export default urlSlice.reducer;

export const shortenUrl = (urlObj) => async (dispatch) => {
  dispatch(loading());
  try {
    const savedUrls = JSON.parse(localStorage.getItem('url'));
    const response = await api.postApi('/api/url', urlObj);
    if (response) {
      const urlArr = savedUrls || { data: [] };
      const { url } = response;
      urlArr.data.push(url);
      localStorage.setItem('url', JSON.stringify(urlArr));
      dispatch(createUrls(urlArr));
      fetchUrls(urlObj.userId);
      console.log('dara >> >> >>', urlArr);

      // Set current user
      dispatch(urlCreated());
    }
  } catch (error) {
    dispatch(setError(error));
  }
};

export const shortenNoAuthUrl = (urlObj) => async (dispatch) => {
  dispatch(loading());
  try {
    const savedUrls = JSON.parse(localStorage.getItem('noAuthUrl'));
    const response = await api.postApi('/api/url', urlObj);
    if (response) {
      const urlArr = savedUrls || { data: [] };
      const { url } = response;
      urlArr.data.push(url);
      localStorage.setItem('noAuthUrl', JSON.stringify(urlArr));
      dispatch(createUrls(urlArr));
      fetchnoAuthUrls();
      console.log('dara >> >> >>', urlArr);

      // Set current user
      dispatch(urlCreated());
    }
  } catch (error) {
    dispatch(setError(error));
  }
};
export const fetchUrls = (id) => async (dispatch) => {
  console.log('canbvc');
  dispatch(loading());
  try {
    const savedUrls = JSON.parse(localStorage.getItem('url'));
    console.log(id, savedUrls.data);
    const result = savedUrls.data.filter((word) => word.userId === id);

    console.log(result, 'herehgfds');
    if (result.length > 0) {
      const arr = savedUrls.data.map((character) => character.clicks);
      const sum = arr.reduce((a, b) => a + b, 0);
      dispatch(setClicks(sum));
      return dispatch(getUrls(savedUrls));
    }
    dispatch(getUrls([]));
  } catch (error) {
    dispatch(setError(error));
  }
  return null;
};
export const fetchnoAuthUrls = () => async (dispatch) => {
  console.log('canbvcmnbjhv');
  dispatch(loading());
  try {
    const savedUrls = JSON.parse(localStorage.getItem('noAuthUrl'));
    console.log(savedUrls, 'herehgfds');
    if (savedUrls.data.length > 0) {
      return dispatch(getUrls(savedUrls));
    }
    dispatch(getUrls([]));
  } catch (error) {
    dispatch(setError(error));
  }
  return null;
};
export const redirectUrl = (url) => async (dispatch) => {
  console.log('caluhgfd');
  dispatch(loading());
  try {
    const savedUrls = JSON.parse(localStorage.getItem('url'));
    console.log(url, savedUrls.data);
    const result = savedUrls.data.filter((word) => word.shortUrl === url);
    console.log(result, 'herehgfds');
    const objIndex = savedUrls.data.findIndex(((obj) => obj.shortUrl === url));
    savedUrls.data[objIndex].clicks += 1;
    console.log(objIndex, 'characters');
    console.log(result, 'herehgfds');
    localStorage.setItem('url', JSON.stringify(savedUrls));

    if (result.length > 0) {
      dispatch(createUrls(savedUrls));
      dispatch(urlRedirect(result[0].url));
    }
  } catch (error) {
    dispatch(setError(error));
  }
};

export const noAuthredirectUrl = (url) => async (dispatch) => {
  console.log('caluhgfdkjh');
  dispatch(loading());
  try {
    const savedUrls = JSON.parse(localStorage.getItem('noAuthUrl'));
    const result = savedUrls.data.filter((word) => word.shortUrl === url);
    console.log(result, 'herehgfds');
    const objIndex = savedUrls.data.findIndex(((obj) => obj.shortUrl === url));
    savedUrls.data[objIndex].clicks += 1;
    console.log(savedUrls.data[objIndex].clicks, 'characters');
    console.log(result, 'herehgfds');
    localStorage.setItem('noAuthUrl', JSON.stringify(savedUrls));
    if (result.length > 0) {
      dispatch(createUrls(savedUrls));
      dispatch(urlRedirect(result[0].url));
    }
  } catch (error) {
    dispatch(setError(error));
  }
};
export const clearData = () => async (dispatch) => {
  dispatch(reset());
};
