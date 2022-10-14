import { createSlice } from "@reduxjs/toolkit";
import {
	fetchProfileAction,
	fetchUpdateProfileAction,
	fetchUserAction,
	signInAction,
} from "./authAction";

const initialState = {
	profile: null,
	user: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {},

	extraReducers(builder) {
		// Sign in
		builder.addCase(signInAction.fulfilled, (state, action) => {
			state.profile = action.payload;
		});

		// Get profile
		builder.addCase(fetchProfileAction.fulfilled, (state, action) => {
			state.profile = action.payload;
		});

		// Get user
		builder.addCase(fetchUserAction.fulfilled, (state, action) => {
			state.user = action.payload;
		});
	},
});

export default authSlice;
