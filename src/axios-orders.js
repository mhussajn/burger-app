import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-app-db66f.firebaseio.com/'
});

export default instance;

