import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../api/axios.js';
import { resetTokenState } from "../../token/tokenSlice.js";
import { tokenDecode } from "../../token/thunks/tokenThunkActions.js";

export const userLogin = createAsyncThunk(
    "user/userLogin",
    async (userData, thunkAPI) => {
        const { email, password } = userData;
        const data =  JSON.stringify({ email, password })
        try {
            const response = await axios.post("users/signin", data);
            const decoded = await thunkAPI.dispatch(tokenDecode(response.data));
            return decoded.payload.payload;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return thunkAPI.rejectWithValue(error.response.data.error);
        }
    }
);

export const userSignUp = createAsyncThunk(
    "user/userSignUp",
    async (userData, thunkAPI) => {
        const { email, password } = userData;
        const data = JSON.stringify({ email, password });
        try {
            const response = await axios.post("users/signup", data);
            const decoded = await thunkAPI.dispatch(tokenDecode(response.data));
            return decoded.payload.payload;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return thunkAPI.rejectWithValue(error.response.data.error);
        }
    }
);

export const userSignOut = createAsyncThunk(
    "user/userSignOut",
    async (_, thunkAPI) => {
        try {
            const response = await axios.delete('users/signout');
            thunkAPI.dispatch(resetTokenState());
            return response.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
