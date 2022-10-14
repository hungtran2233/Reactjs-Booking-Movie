import { movieTheaterGroup } from "features/movies/pages/home/utils/homeSelector";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spin, Layout, Menu, Row, Col, Card, Button } from "antd";
import "./TheaterGroup.scss";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import DateTheater from "../date-custom/DateTheater";
import Test from "./test";
const TheaterGroup = (props) => {
	const { Meta } = Card;
	const { movieTheaterMovie, theaterList, theaterGroupFetch } = props;
	const history = useHistory();
	//get index for lstCumRap => show movies based on theater cluster
	const [index, setIndex] = useState("0");

	if (!movieTheaterMovie) return <Spin></Spin>;
	//Go Pages Details with idMovies --by Phong
	const goToDetail = (idMovies) => {
		history.push("/detail/" + idMovies + "/" + null);
		//	history.push("/detail/" + maPhim + "/" + biDanh);
	};
	//Go Pages Details with idPremiere --by Phong
	const goToBooking = (idPremiere) => {
		const login = localStorage.getItem("login");
		// history.push("/booking/" + idPremiere);
		if (login === "true") history.push("/booking/" + idPremiere);

		if (login !== "true") history.push("/signin");
	};
	//setup Menu.Item ANTD recommended, header--menu
	const items1 = theaterList.map((theater) => ({
		label: (
			<button className="btn--header">
				<img className="img--header" src={theater.logo} />
			</button>
		),
		key: theater.maHeThongRap,
	}));
	//setup Menu.Item ANTD recommended, slider--menu
	const items2 = movieTheaterMovie[0].lstCumRap.map(
		(theaterGroup, index) => ({
		
			label: (
				<div className="sider--items">
					<div className="sider--img">
						{" "}
						<img width={60} src={movieTheaterMovie[0].logo} />
					</div>
					<div className="theater--name">
						<p style={{ display: "inline" }}>
							{theaterGroup.tenCumRap}
						</p>
					</div>
				</div>
			),

			key: index,
		})
	);

	return (
		<Layout style={{ backgroundColor: "#fff" }}>
			<Layout.Header className="header__filter">
				<div className="logo">
					<svg
						width={32}
						height={32}
						viewBox="0 0 32 32"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g fill="none" fillRule="evenodd">
							<path d="M0 0h32v32H0z" />
							<path d="M0 0h32v32H0z" />
							<path
								fill="#FEE6CD"
								d="M29 7v5.01l-1.992 1.993v3.9L29.105 20v5h-4.987V7"
							/>
							<path
								d="M7 6a1 1 0 0 1 .117 1.993L7 8H5a1 1 0 0 0-.993.883L4 9v1.74a1 1 0 0 0 .177.568l.076.096.99 1.113a3 3 0 0 1 .749 1.774l.008.22v2.979a3 3 0 0 1-.618 1.823l-.14.17-.99 1.113a1 1 0 0 0-.245.543L4 21.26V23a1 1 0 0 0 .883.993L5 24h22a1 1 0 0 0 .993-.883L28 23v-1.74a1 1 0 0 0-.177-.568l-.076-.096-.99-1.113a3 3 0 0 1-.749-1.774L26 17.49V14.51a3 3 0 0 1 .618-1.823l.14-.17.99-1.113a1 1 0 0 0 .245-.543L28 10.74V9a1 1 0 0 0-.883-.993L27 8H14a1 1 0 0 1-.117-1.993L14 6h13a3 3 0 0 1 2.995 2.824L30 9v1.74a3 3 0 0 1-.618 1.823l-.14.17-.99 1.113a1 1 0 0 0-.245.543L28 14.51v2.98a1 1 0 0 0 .177.568l.076.096.99 1.113a3 3 0 0 1 .749 1.774l.008.22V23a3 3 0 0 1-2.824 2.995L27 26H5a3 3 0 0 1-2.995-2.824L2 23v-1.74a3 3 0 0 1 .618-1.823l.14-.17.99-1.113a1 1 0 0 0 .245-.543L4 17.49v-2.98a1 1 0 0 0-.177-.568l-.076-.096-.99-1.113a3 3 0 0 1-.749-1.774L2 10.74V9a3 3 0 0 1 2.824-2.995L5 6h2zm5.345 6.609a2 2 0 0 1 2.645-.615l3.983 2.27a2 2 0 0 1 .002 3.474l-3.983 2.275A2 2 0 0 1 12 18.277v-4.545a2 2 0 0 1 .262-.99zM14 13.732v4.545L17.982 16 14 13.731zM11 6a1 1 0 0 1 .117 1.993L11 8h-1a1 1 0 0 1-.117-1.993L10 6h1z"
								fill="#FA901E"
								fillRule="nonzero"
							/>
						</g>
					</svg>
				</div>
				<Menu
					className="menu--header"
					style={{ border: "none" }}
					onClick={(e) => {
						theaterGroupFetch(e.key);
						setIndex("0");
					}}
					theme="light  "
					mode="horizontal"
					defaultSelectedKeys={["BHDStar"]}
					items={items1}
				/>
			</Layout.Header>

			<Layout
				className="content__cover"
				style={{
					padding: "24px 0",
				}}
			>
				<Layout.Sider
					onBreakpoint={(borken) => {}}
					onCollapse={(collapsed, type) => {
						// console.log(collapsed, type);
					}}
					width={300}
					collapsedWidth="0"
					breakpoint="md"
					className=" ant-layout-sider ant-layout-sider-light sider"
				>
					<Menu
						className="sider--menu"
						onClick={(e) => {
							setIndex(e.key);
						}}
						mode="inline"
						selectedKeys={index}
						items={items2}
					/>
				</Layout.Sider>
				<Layout className="content">
					<Layout.Content
						className="site-layout-background content"
						style={{
							padding: 24,
							margin: 0,
							minHeight: 280,
						}}
					>
						<div className="site-card-wrapper">
							{movieTheaterMovie[0]?.lstCumRap[
								index
							].danhSachPhim.map((movies) => {
								if (movies.dangChieu) {
									return (
										<Row
											key={movies.maPhim}
											className="card"
										>
											<Col
												span={8}
												md={{ span: 6 }}
												lg={{ span: 6 }}
												xl={{ span: 8 }}
												className="col--img"
											>
												<img
													onClick={() => {
														goToDetail(
															movies.maPhim
														);
													}}
													width={95}
													src={movies.hinhAnh}
												/>
											</Col>
											<Col
												span={16}
												md={{ span: 18 }}
												lg={{ span: 18 }}
												xl={{ span: 16 }}
												className="col--title"
											>
												<div>
													<h2>{movies.tenPhim}</h2>
													<h3>Xuất Chiếu</h3>
													<Row>
														{movies.lstLichChieuTheoPhim.map(
															(time) => {
																return (
																	<Col
																		key={
																			time.maLichChieu
																		}
																		span={6}
																		lg={{
																			span: 6,
																		}}
																		md={{
																			span: 8,
																		}}
																		xs={{
																			span: 12,
																		}}
																		sm={{
																			span: 12,
																		}}
																		style={{
																			width: "20%",
																		}}
																	>
																		<DateTheater
																			time={
																				time
																			}
																			goToBooking={
																				goToBooking
																			}
																		/>
																	</Col>
																);
															}
														)}
													</Row>
												</div>
											</Col>
										</Row>
									);
								}
							})}
						</div>
					</Layout.Content>
				</Layout>
			</Layout>
		</Layout>
	);
};

export default TheaterGroup;
