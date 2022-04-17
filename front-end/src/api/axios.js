import Axios from 'axios';

export default Axios.create({
  baseURL: '//127.0.0.1:12580',
  timeout: 5000
});
