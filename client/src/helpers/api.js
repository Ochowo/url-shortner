import axios from 'axios';

const getApi = async (url) => {
  const res = await axios.get(url);
  const {
    data: { data },
  } = res;
  return data;
};

const postApi = async (url, formValues) => {
  const res = await axios.post(url, formValues);
  const {
    data: { data },
  } = res;
  return data;
};

export default { getApi, postApi };
