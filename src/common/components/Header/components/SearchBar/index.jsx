import {
	CloseCircleOutlined,
	CloseOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Spin } from "antd";
import instance from "api/instance";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function SearchBar() {
	const dispatch = useDispatch();
	const [movieList, setMovieList] = useState([]);

	/////
	const [filterData, setFilterData] = useState([]);
	const [wordEntered, setWordEntered] = useState("");

	const getMovieListAction = createAsyncThunk(
		"searchBar/getMovieList",
		async () => {
			try {
				const res = await instance.request({
					url: "/api/QuanLyPhim/LayDanhSachPhim",
					method: "GET",
					params: {
						maNhom: "GP03",
					},
				});
				// console.log(res.data.content);
				return res.data.content;
			} catch (err) {
				console.log(err);
			}
		}
	);

	const fetchMovieList = async () => {
		const data = await dispatch(getMovieListAction());
		setMovieList(data.payload);
	};

	useEffect(() => {
		fetchMovieList();
	}, []);

	if (!movieList) {
		return <Spin size="large" />;
	}

	const handleFilter = (event) => {
		const searchWord = event.target.value;
		setWordEntered(searchWord);
		const newFilter = movieList.filter((item) => {
			return item.tenPhim
				.toLowerCase()
				.includes(searchWord.toLowerCase());
		});

		if (searchWord === "") {
			setFilterData([]);
		} else {
			setFilterData(newFilter);
		}
	};

	// Clear word input when click X
	const clearInput = () => {
		setFilterData([]);
		setWordEntered("");
	};

	return (
		<>
			<div className="searchInputs">
				<input
					type="text"
					placeholder="Nhập tên phim..."
					onChange={handleFilter}
					value={wordEntered}
				/>
				{filterData.length === 0 ? (
					<SearchOutlined className="icon" />
				) : (
					<CloseOutlined onClick={clearInput} className="icon" />
				)}
			</div>
			{filterData.length !== 0 && (
				<div className="dataResult">
					{filterData?.map((item) => {
						return (
							<Link
								key={item.maPhim}
								to={
									"/detail/" + item.maPhim + "/" + item.biDanh
								}
								onClick={clearInput}
							>
								<div className="search-content">
									<img src={item.hinhAnh} alt="" />
									<span>{item.tenPhim}</span>
								</div>
							</Link>
						);
					})}
				</div>
			)}
		</>
	);
}

export default SearchBar;
