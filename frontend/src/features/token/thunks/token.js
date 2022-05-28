import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../../api/axios.js";

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
