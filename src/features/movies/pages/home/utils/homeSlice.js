import { createSlice } from "@reduxjs/toolkit";
import {
	fetchMovieListAction,
	fetchMoviesTheater,
	fetchTheater,
	fetchTheaterGroupAction,
} from "./homeAction";
const homeSlice = createSlice({
	name: "home",
	initialState: {
		movieList: null,
		theaterList: null,
		moviesTheater: null,
		// theaterGroup: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		// Movie List --by Hung
		builder.addCase(fetchMovieListAction.fulfilled, (state, action) => {
			state.movieList = action.payload;
		});

		// -- by Phong
		builder.addCase(fetchTheater.fulfilled, (state, action) => {
			state.theaterList = action.payload;
		});

		builder.addCase(fetchMoviesTheater.fulfilled, (state, action) => {
			state.moviesTheater = action.payload;
		});

		// Theater Group
		// builder.addCase(fetchTheaterGroupAction.fulfilled, (state, action) => {
		// 	state.theaterGroup = action.payload;
		// });
	},
});
export default homeSlice;
