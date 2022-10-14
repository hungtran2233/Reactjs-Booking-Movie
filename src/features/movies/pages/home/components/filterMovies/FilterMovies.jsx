import React, { useEffect } from "react";
import { Card, Row, Col, Spin } from "antd";
import { fetchMoviesTheater, fetchTheater } from "../../utils/homeAction";
import { useDispatch, useSelector } from "react-redux";
import { theater, movieTheaterGroup } from "../../utils/homeSelector";
import TheaterGroup from "./components/theater-group/TheaterGroup";
const FilterMovies = () => {
	const dispatch = useDispatch();
	const theaterList = useSelector(theater);
	const movieTheaterMovie = useSelector(movieTheaterGroup);

	const theaterFetch = async () => {
		const data = await dispatch(fetchTheater());
		theaterGroupFetch(data.payload[0].maHeThongRap);
	};

	const theaterGroupFetch = (idTheater) => {
		dispatch(fetchMoviesTheater(idTheater));
	};

	useEffect(() => {
		theaterFetch();
		theaterGroupFetch();
	}, []);
	if (!theaterList) {
		return (
			<div style={{ textAlign: "center" }}>
				<Spin size="large" />
			</div>
		);
	}

	return (
		<div className="filter" id="filterMovieId">
			<div className="container">
				<h1 style={{ textAlign: "center", color: "#a50064" }}>
					Lịch Chiếu Phim
				</h1>
				<TheaterGroup
					movieTheaterMovie={movieTheaterMovie}
					theaterGroupFetch={theaterGroupFetch}
					theaterList={theaterList}
				/>
			</div>
		</div>
	);
};

export default FilterMovies;
