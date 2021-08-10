import axios from 'axios';

export default {
    getPosts() {
        return axios.get('http://localhost:3000/api/posts');
    },
    getPostbyId(id) {
        return axios.get('http://localhost:3000/api/posts/' + id);
    },
    createPost() {
        return axios.post('http://localhost:3000/api/posts');
    },
    updatePost(id) {
        return axios.put('http://localhost:3000/api/posts/' + id);
    },
    deletePost(id) {
        return axios.delete('http://localhost:3000/api/posts/' + id);
    },
    likePost(id) {
        return axios.post('http://localhost:3000/api/posts/' + id) + '/like';
    },
    dislikePost(id) {
        return axios.post('http://localhost:3000/api/posts/' + id + '/like');
    },
    commentPost(id) {
        return axios.post('http://localhost:3000/api/posts/' + id + '/comment');
    },
    updateComment(id, comId) {
        return axios.put(
            'http://localhost:3000/api/posts/' + id + '/comment/' + comId
        );
    },
    deleteComment(id, comId) {
        return axios.delete(
            'http://localhost:3000/api/posts/' + id + '/comment' + comId
        );
    },
};

/* Auth.register({
    pseudo: 'john'
    email: 'test@mail.com',
    password: '123456'
}) */