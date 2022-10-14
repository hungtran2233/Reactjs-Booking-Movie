import { PlayCircleOutlined } from "@ant-design/icons";
import { Col, Row, Menu, Layout } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import notFoundImg from "../../../../../../../../assets/img/icon/notFound.png";
import TheaterInfo from "./TheaterInfo";

function MovieSchedule(props) {
	// Selected Movie
	const selectedMovie = props.selectedMovie;
	// Array (Theater Group)
	const theaterList = props.theaterList;
	// Schedule of 1 film
	const schedule = props.schedule;

	//// Set theater
	const [theaterGroupId, setTheaterGroupId] = useState("BHDStar");
	// Current theater
	const currentTheater = schedule.heThongRapChieu.find(
		(item) => item.maHeThongRap === theaterGroupId
	);
	//// Set index for Menu --antd
	const [index, setIndex] = useState("0");

	// Set theater group when click button Theater
	const handleChangeTheaterGroup = (id) => {
		// console.log(id);
		setTheaterGroupId(id);
	};

	useEffect(() => {}, [theaterGroupId]);

	// Setting  -- Ant Design
	const { Header, Content, Sider } = Layout;
	const items1 = theaterList.map((theaterGroup) => ({
		key: theaterGroup.maHeThongRap,
		label: (
			<div className="btn-header">
				<img className="logo-theater" src={theaterGroup.logo} alt="" />
			</div>
		),
	}));

	// Render logo to get logo for label item2
	const renderLogo = () => {
		let logoDefault;
		if (!currentTheater) {
			logoDefault = null;
		} else {
			logoDefault = currentTheater.logo;
		}
		return logoDefault;
	};

	const items2 = currentTheater?.cumRapChieu.map((theater, index) => ({
		key: index,
		label: (
			<div className="btn-header">
				<img
					className="logo-theater"
					width={30}
					style={{ marginRight: 10 }}
					src={renderLogo()}
					alt=""
				/>
				{theater.tenCumRap}
			</div>
		),
	}));

	//// Create Schedule Content  ---
	const theaterInfo = currentTheater?.cumRapChieu[index];

	// show not found image when no return data
	const notFound = (
		<div className="not-found">
			<img src={notFoundImg} alt="" />
		</div>
	);

	return (
		<div className="MovieSchedule">
			<div className="schedule-title">
				Lịch chiếu: {selectedMovie.tenPhim}
			</div>
			<Layout className="layout-custom">
				<Header className="header">
					<Menu
						className="menu-header"
						theme="light"
						mode="horizontal"
						defaultSelectedKeys={["BHDStar"]}
						items={items1}
						onClick={(e) => {
							handleChangeTheaterGroup(e.key);
							setIndex("0");
						}}
					/>
				</Header>
				<Layout className="body">
					<Sider theme="" width={280} className="sider">
						<Menu
							mode="inline"
							selectedKeys={index}
							onClick={(e) => {
								// console.log(e);
								setIndex(e.key);
							}}
							style={{
								height: "100%",
								borderRight: 0,
							}}
							items={items2}
						/>
					</Sider>
					<Layout
						className="box-layout"
						style={{
							padding: "0 24px 24px",
							background: "#f1f2f6",
						}}
					>
						<Content
							className="layout-content"
							style={{
								padding: 24,
								margin: 0,
								minHeight: 280,
							}}
						>
							{currentTheater?.cumRapChieu[0] ? (
								<TheaterInfo
									selectedMovie={selectedMovie}
									theaterInfo={theaterInfo}
								/>
							) : (
								notFound
							)}
						</Content>
					</Layout>
				</Layout>
			</Layout>
		</div>
	);
}

export default MovieSchedule;
