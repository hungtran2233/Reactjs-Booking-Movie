import React from "react";
import Banner from "./components/Banner";
import FilterMovies from "./components/filterMovies/FilterMovies";
// Slick slider --by Hung
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NowShowingMovie from "./components/NowShowingMovie";
import UpcomingMovie from "./components/UpcomingMovie";
import Trailer from "./components/Trailer";
import CinemasGroup from "./components/CinemasGroup";
import ScrollToTop from "features/movies/components/ScrollToTop";
const Home = () => {
	return (
		<div>
			<ScrollToTop />
			<Banner />
			<NowShowingMovie />
			<UpcomingMovie />
			<FilterMovies />
			<Trailer />
			<CinemasGroup />
		</div>
	);
};

export default Home;
