import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../../api/axios.js";

export const tokenDecode = createAsyncThunk(
    "tokenDecode",
    (token, thunkAPI) => {
        try {
            const encodedPayload = token.split(".")[1];
            const decoded = JSON.parse(window.atob(encodedPayload));

            if (Date.now() >= decoded.exp * 1000) {
                return thunkAPI.rejectWithValue({
                    message: "Authentication Error - access token expired",
                });
            };
            return {
                accessToken: token,
                ...decoded
            }
        } catch (error) {
            return thunkAPI.rejectWithValue({
                message: "Authentication Error - token expired",
            });
        }
    }
);

export const tokenRefresh = createAsyncThunk(
    "tokenRefresh",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosPrivate.get("refresh");
            return await response.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data.error);
        }
    }
);

