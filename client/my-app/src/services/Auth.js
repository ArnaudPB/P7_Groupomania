import axios from 'axios';

export default {
    signup(info) {
        return axios.post('http://localhost3000/api/signup', info);
    },
};

/* Auth.register({
    pseudo: 'Kiryu',
    email: 'test@mail.com',
    password: '123456'
}) */