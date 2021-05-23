import axios from "axios";
import {
    GET_USER,
    UPDATE_USER,
    GET_FREINDS,
    GET_ALLUSERS,
    ITEMS_LOADING,
    ADD_FRIEND,
    REMOVE_FRIEND,
} from "../actions/types";

export const getprofil = (id) => async (dispatch) => {
    //dispatch(setItemsLoading());
    try {
        const res = await axios.get("/api/user/" + id, {
            withCredentials: true,
        });
        dispatch({
            type: GET_USER,
            payload: res.data,
        });
    } catch (e) {
        dispatch({
            payload: console.log("salma" + e),
        });
    }
};

export const getUser = (id) => async (dispatch) => {
    //dispatch(setItemsLoading());
    try {
        const res = await axios.get("/api/user/" + id, {
            withCredentials: true,
        });
        dispatch({
            type: GET_USER,
            payload: res.data,
        });
    } catch (e) {
        dispatch({
            payload: console.log("salma" + e),
        });
    }
};

export const getAllUsers = () => async (dispatch) => {
    dispatch(setItemsLoading());
    try {
        const res = await axios.get("/api/users", { withCredentials: true });
        dispatch({
            type: GET_ALLUSERS,
            payload: res.data,
        });
    } catch (e) {
        dispatch({
            payload: console.log("salma" + e),
        });
    }
};

export const updateUser = (id, user) => async (dispatch) => {
    try {
        const res = await axios.put("/api/user/" + id, user, {
            withCredentials: true,
        });
        dispatch({
            type: UPDATE_USER,
            payload: res.data,
        });
    } catch (e) {
        dispatch({
            payload: console.log(e),
        });
    }
};

export const getfriends = (id) => async (dispatch) => {
    //dispatch(setItemsLoading());
    try {
        const res = await axios.get("/api/user/" + id + "/friends", {
            withCredentials: true,
        });
        dispatch({
            type: GET_FREINDS,
            payload: res.data,
        });
    } catch (e) {
        dispatch({
            payload: console.log("salma" + e),
        });
    }
};

export const addfriend = (id, friend) => async (dispatch) => {
    //dispatch(setItemsLoading());
    try {
        const res = await axios.put("/api/user/" + id + "/friends", friend, {
            withCredentials: true,
        });
        dispatch({
            type: ADD_FRIEND,
            payload: res.data,
        });
    } catch (e) {
        dispatch({
            payload: console.log("salma" + e),
        });
    }
};

export const removefriend = (id, id_friend) => async (dispatch) => {
    //dispatch(setItemsLoading());
    try {
        const res = await axios.delete(
            "/api/user/" + id + "/friend/" + id_friend,
            { withCredentials: true }
        );
        dispatch({
            type: REMOVE_FRIEND,
            payload: res.data,
        });
    } catch (e) {
        dispatch({
            payload: console.log("salma" + e),
        });
    }
};
/*export const updateUser =  user  => dispatch =>{
	axios
    .put('/api/user/608b5f75364b4861c006aa72',user)
	.then(res=>{
	   dispatch({
 		type: UPDATE_USER,
		payload : res.data
	   })
	})
};*/

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING,
    };
};
