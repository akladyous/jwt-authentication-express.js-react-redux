import axios from "axios";
import { axiosPrivate } from "../api/axios.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const refreshToken = createAsyncThunk(
    "refreshToken",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosPrivate.get("/refresh");
            return await response.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data.error);
        }
    }
);

export const userLogin = createAsyncThunk(
    "user/userLogin",
    async (userData, { rejectWithValue }) => {
        const { email, password } = userData;
        const config = {
            method: "post",
            url: "http://localhost:4000/api/users/signin",
            headers: { "Content-type": "application/json" },
            data: JSON.stringify({ email, password }),
            withCredentials: true,
        };
        try {
            const response = await axios(config);
            // localStorage.setItem("token", response.data);
            // console.log('login thunk response : ', response)
            return response.data;
        } catch (error) {
            // localStorage.removeItem('state')
            if (!error.response) {
                throw error;
            }

            return rejectWithValue(error.response.data.error);
        }
    }
);

export const userSignUp = createAsyncThunk(
    "user/userSignUp",
    async (userData, { rejectWithValue }) => {
        const { email, password } = userData;
        const config = {
            method: "post",
            url: "http://localhost:4000/api/users/signup",
            headers: { "Content-type": "application/json" },
            data: JSON.stringify({ email, password }),
            withCredentials: true,
        };
        try {
            const response = await axios(config);
            // localStorage.setItem("token", response.data);
            return response.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            // console.log("error from axios : ", error);
            // throw new Error(error.response.data.error);
            // thunkAPI.rejectWithValue('test value')
            return rejectWithValue(error.response.data.error);
        }
    }
);

export const userSignOut = createAsyncThunk(
    "user/userSignOut",
    async (_, { rejectWithValue }) => {
        const config = {
            method: "delete",
            url: "http://localhost:4000/api/users/signout",
            headers: { "Content-type": "application/json" },
            withCredentials: true,
        };
        try {
            const response = await axios(config);
            localStorage.removeItem("state");
            return response.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
);


