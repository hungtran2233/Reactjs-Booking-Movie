//Lấy ds phim --by Hung
export const movieListSelector = (state) => state.movieHome.movieList;
//lấy ds hệ thống rạp --by Phong
export const theater = (state) => state.movieHome.theaterList;
//lấy cụm rạp --by Phong
// export const theaterGroup = state =>state.movieHome.theaterGroup
export const theaterGroup = (state) => state.movieHome.theaterGroup;
//Lấy ds phim theo rạp --by Phong
export const movieTheaterGroup = (state) => state.movieHome.moviesTheater;
