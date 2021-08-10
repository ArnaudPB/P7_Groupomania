import axios from "axios";

export default {
    signup(info) {
        return axios.post("http://localhost3000/api/signup", info);
    },
    login(credentials) {
        return axios.post('http://localhost:3000/api/login', credentials);
    },
};

/* Auth.register({
    pseudo: 'Kiryu',
    email: 'test@mail.com',
    password: '123456'
}) */