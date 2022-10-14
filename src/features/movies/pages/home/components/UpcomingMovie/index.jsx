import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { fetchMovieListAction } from "../../utils/homeAction";
import { movieListSelector } from "../../utils/homeSelector";
import SampleNextArrow from "../SliderArrow/SampleNextArrow";
import SamplePrevArrow from "../SliderArrow/SamplePrevArrow";
import UpcomingMovieItem from "./components/UpcomingMovieItem";

function UpcomingMovie() {
	const dispatch = useDispatch();

	const movieList = useSelector(movieListSelector);
	// Create next arrow  and prev arrow
	const slider = useRef(null);

	const fetchUpcomingMovie = () => {
		dispatch(fetchMovieListAction());
	};

	useEffect(() => {
		fetchUpcomingMovie();
	}, []);

	if (!movieList) {
		return (
			<div style={{ textAlign: "center" }}>
				<Spin size="large" />
			</div>
		);
	}

	const upcomingMovie = movieList.filter((item) => {
		return item.sapChieu === true;
	});

	// Setting for slick slider
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 5,
		autoplay: true,
		autoplaySpeed: 2000,
		// arrows: false,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,

		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			},
		],
	};

	return (
		<div className="UpcomingMovie" id="upComing">
			<div className="container">
				<h1 className="title">Phim sắp chiếu</h1>

				<Slider className="slider" ref={slider} {...settings}>
					{upcomingMovie?.map((item) => {
						return (
							<UpcomingMovieItem key={item.maPhim} item={item} />
						);
					})}
				</Slider>
			</div>
		</div>
	);
}

export default UpcomingMovie;
