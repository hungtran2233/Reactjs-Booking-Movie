import { Col, Row } from "antd";
import useLocalStorage from "common/hooks/useLocalStorage";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import MovieListColumn from "./components/MovieListColumn";
import MovieSchedule from "./components/MovieSchedule";
import RateStar from "./components/RateStar";
import UserComment from "./components/UserComment";

function MovieBody(props) {
	// Selected Movie;
	const selectedMovie = props.selectedMovie;
	// Array (Theater Group)
	const theaterList = props.theater;
	// Schedule of 1 film
	const schedule = props.schedule;
	// MovieListColumn
	const movieList = props.movieList;

	return (
		<div style={{overflow:'hidden'}} className="MovieBody">
			{/* {console.log(selectedMovie)} */}
			<div className="container">
				<Row>
					<Col xs={24} sm={24} md={24} lg={18} xl={18}>
						<MovieSchedule
							selectedMovie={selectedMovie}
							theaterList={theaterList}
							schedule={schedule}
						/>
						<UserComment />
					</Col>
					<Col xs={24} sm={24} md={24} lg={6} xl={6}>
						<RateStar selectedMovie={selectedMovie} />
						<MovieListColumn movieList={movieList} />
					</Col>
				</Row>
			</div>
		</div>
	);
}

export default MovieBody;
