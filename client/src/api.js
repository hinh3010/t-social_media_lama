import axios from "axios";
import { BASE_URL } from "./utils";

export const apiLogin = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
        const res = await axios.post(BASE_URL + "auth/login", userCredential);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
};

export const apiRegister = async (payload) => {
    try {
        const res = await axios.post(BASE_URL + "auth/register", payload);
        return {
            res: res.data,
            err: null
        }
    } catch (err) {
        console.log({ err: err.message })
        return {
            err: err,
            res: null
        }
    }
}

export const apiCreatePost = async (payload) => {
    try {
        const res = await axios.post(BASE_URL + "posts", payload);
        return {
            res: res.data,
            err: null
        }
    } catch (err) {
        console.log({ err: err.message })
        return {
            err: err,
            res: null
        }
    }
}

export const apiUpload = async (formData) => {
    try {
        const res = await axios.post(BASE_URL + "upload", formData);
        return {
            res: res.data,
            err: null
        }
    } catch (err) {
        console.log({ err: err.message })
        return {
            err: err,
            res: null
        }
    }
}



export const apiGetFriends = async (userId) => {
    try {
        const res = await axios.get(BASE_URL + "users/friends/" + userId);
        return {
            res: res.data,
            err: null
        }
    } catch (err) {
        console.log({ err: err.message })
        return {
            err: err,
            res: null
        }
    }
}

export const apiGetUser = async (userId) => {
    try {
        const res = await axios.get(BASE_URL + "users?userId=" + userId);
        return {
            res: res.data,
            err: null
        }
    } catch (err) {
        console.log({ err: err.message })
        return {
            err: err,
            res: null
        }
    }
}

export const apiFollow = async (userId, payload) => {
    try {
        const res = await axios.put(BASE_URL + `users/${userId}/follow`, payload);
        return {
            res: res.data,
            err: null
        }
    } catch (err) {
        console.log({ err: err.message })
        return {
            err: err,
            res: null
        }
    }
}

export const apiUnFollow = async (userId, payload) => {
    try {
        const res = await axios.put(BASE_URL + `users/${userId}/unfollow`, payload);
        return {
            res: res.data,
            err: null
        }
    } catch (err) {
        console.log({ err: err.message })
        return {
            err: err,
            res: null
        }
    }
}

export const apiConversations = async (userId) => {
    try {
        const res = await axios.get(BASE_URL + `conversations/${userId}`);
        return {
            res: res.data,
            err: null
        }
    } catch (err) {
        console.log({ err: err.message })
        return {
            err: err,
            res: null
        }
    }
}


export const getGetMessage = async (id) => {
    try {
        const res = await axios.get(BASE_URL + "messages/" + id);
        return {
            res: res.data,
            err: null
        }
    } catch (err) {
        console.log({ err: err.message })
        return {
            err: err,
            res: null
        }
    }
}


export const apiCreateMessage = async (data) => {
    try {
        const res = await axios.post(BASE_URL + "messages", data);
        return {
            res: res.data,
            err: null
        }
    } catch (err) {
        console.log({ err: err.message })
        return {
            err: err,
            res: null
        }
    }
}
