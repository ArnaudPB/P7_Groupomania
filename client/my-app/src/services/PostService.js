import Api from '../services/Api';

export default {
    getPosts() {
        return Api().get('posts');
    },
    getPostbyId(id) {
        return Api().get('posts/' + id);
    },
    createPost() {
        return Api().post('posts');
    },
    updatePost(id) {
        return Api().put('posts/' + id);
    },
    deletePost(id) {
        return Api().delete('posts/' + id);
    },
    likePost(id) {
        return Api().post('posts/' + id) + '/like';
    },
    dislikePost(id) {
        return Api().post('posts/' + id + '/like');
    },
    commentPost(id) {
        return Api().post('posts/' + id + '/comment');
    },
    updateComment(id, comId) {
        return Api().put(
            'posts/' + id + '/comment/' + comId
        );
    },
    deleteComment(id, comId) {
        return Api().delete(
            'posts/' + id + '/comment' + comId
        );
    },
};

/* Auth.register({
    pseudo: 'john'
    email: 'test@mail.com',
    password: '123456'
}) */