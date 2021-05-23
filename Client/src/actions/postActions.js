import axios from "axios";
import {
    GET_POSTS,
    GET_POST,
    POST_ERROR,
    UPDATE_LIKES,
    ADD_POST,
    ADD_COMMENT,
} from "./types";

// get posts
export const getPosts = () => async (dispatch) => {
    try {
        const res = await axios.get(`/api/posts`, { withCredentials: true });
        //console.log(res.data.Posts)

        dispatch({
            type: GET_POSTS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: console.log(err),
        });
    }
};

// get post
export const getPost = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/posts/${id}`);

        dispatch({
            type: GET_POST,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: console.log(err),
        });
    }
};

// Add likes
export const addLike = (infolike) => async (dispatch) => {
    try {
        const res = await axios.put(`/api/posts/like`, infolike, {
            withCredentials: true,
        });

        dispatch({
            type: UPDATE_LIKES,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: console.log(err),
        });
    }
};

// Add a post
export const addPost = (formData) => async (dispatch) => {
    try {
        const res = await axios.post(`/api/posts/`, formData, {
            withCredentials: true,
        });
        dispatch({
            type: ADD_POST,
            payload: res.data,
        });
        window.location.reload();
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: console.log(err),
        });
    }
};

// Add a comment
export const addComment = (infoComment) => async (dispatch) => {
    try {
        const res = await axios.put(`/api/posts/Comment`, infoComment, {
            withCredentials: true,
        });

        dispatch({
            type: ADD_COMMENT,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: console.log(err),
        });
    }
};
