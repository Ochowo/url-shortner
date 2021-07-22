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
    noAuthUrls: null,
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
    getNoAuthUrls: (state, action) => {
      state.isLoading = false;
      state.noAuthUrls = action.payload;
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
    createNoAuthUrls: (state, action) => {
      state.isLoading = false;
      state.noAuthUrls = action.payload;
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
      state.noAuthUrls = null;
    },
    urlRedirect: (state, action) => {
      state.redirectTo = action.payload;
    },
  },
});

export const {
  loading, getUrls, createUrls, setError, urlCreated, createNoAuthUrls,
  urlRedirect, setClicks, clearUrl, reset, noAuthUrls, getNoAuthUrls,
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

      // Set current user
      dispatch(urlCreated());
    }
  } catch (error) {
    dispatch(setError(error));
  }
};

export const fetchUrls = (id) => async (dispatch) => {
  dispatch(loading());
  try {
    const savedUrls = JSON.parse(localStorage.getItem('url'));
    const result = savedUrls.data.filter((word) => word.userId === id);
    if (result && result.length > 0) {
      const arr = savedUrls.data.map((character) => character.clicks);
      const sum = arr.reduce((a, b) => a + b, 0);
      dispatch(setClicks(sum));
      return dispatch(getUrls(savedUrls));
    }
    dispatch(getUrls(null));
  } catch (error) {
    dispatch(setError(error));
  }
  return null;
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
      dispatch(createNoAuthUrls(urlArr));
      // Set current user
      dispatch(urlCreated());
    }
  } catch (error) {
    dispatch(setError(error));
  }
};

export const fetchnoAuthUrls = () => async (dispatch) => {
  dispatch(loading());
  try {
    const savedUrls = JSON.parse(localStorage.getItem('noAuthUrl'));
    if (savedUrls.data.length > 0) {
      return dispatch(getNoAuthUrls(savedUrls));
    }
    dispatch(getNoAuthUrls(null));
  } catch (error) {
    dispatch(setError(error));
  }
  return null;
};

export const noAuthredirectUrl = (url) => async (dispatch) => {
  dispatch(loading());
  try {
    const savedUrls = JSON.parse(localStorage.getItem('noAuthUrl'));
    const result = savedUrls.data.filter((word) => word.shortUrl === url);
    const objIndex = savedUrls.data.findIndex(((obj) => obj.shortUrl === url));
    savedUrls.data[objIndex].clicks += 1;
    localStorage.setItem('noAuthUrl', JSON.stringify(savedUrls));
    if (result.length > 0) {
      dispatch(createNoAuthUrls(savedUrls));
      dispatch(urlRedirect(result[0].url));
    }
  } catch (error) {
    dispatch(setError(error));
  }
};
export const redirectUrl = (url) => async (dispatch) => {
  dispatch(loading());
  try {
    const savedUrls = JSON.parse(localStorage.getItem('url'));
    const result = savedUrls.data.filter((word) => word.shortUrl === url);
    const objIndex = savedUrls.data.findIndex(((obj) => obj.shortUrl === url));
    savedUrls.data[objIndex].clicks += 1;
    localStorage.setItem('url', JSON.stringify(savedUrls));

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
