import {
	AppleFilled,
	CaretRightFilled,
	GitlabOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import React from "react";

import fb from "../../../assets/img/icon/fabook.png";
import zalo from "../../../assets/img/icon/zalo.png";
import twitter from "../../../assets/img/icon/twitter.png";
import instagram from "../../../assets/img/icon/insta.png";
import copyright from "../../../assets/img/icon/copyright.png";
import logoSonic from "../../../assets/img/icon/logo-sonic.png";

function Footer() {
	const movieType = [
		{
			key: "mt1",
			name: "Phim đang chiếu",
		},
		{
			key: "mt2",
			name: "Phim sắp chiếu",
		},
	];

	const blog = [
		{
			key: "b1",
			name: "Review phim",
		},
		{
			key: "b2",
			name: "Top phim hay",
		},
		{
			key: "b3",
			name: "Phim Nexflix",
		},
		{
			key: "b4",
			name: "Phim bom tấn",
		},
		{
			key: "b5",
			name: "Câu chuyện diễn viên",
		},
	];

	const cinemas = [
		{
			key: "c1",
			name: "BHD Star",
		},
		{
			key: "c2",
			name: "Lotte Cinema",
		},
		{
			key: "b3",
			name: "Galaxy Cinema",
		},
		{
			key: "b4",
			name: "CGV",
		},
		{
			key: "b5",
			name: "Beta Cinemas",
		},
		{
			key: "b6",
			name: "Cine Star",
		},
		{
			key: "b7",
			name: "MegaGS",
		},
	];

	return (
		<div className="Footer">
			<div className="container">
				<Row gutter={[0,16]} justify="space-between">
					<Col xs={12} sm={12} md={6} lg={4} xl={4}>
						<div className="schedule">
							<div className="title">Lịch chiếu phim</div>
							{movieType?.map((item) => {
								return (
									<div
										key={item.key}
										className="schedule-item"
									>
										{item.name}
									</div>
								);
							})}
						</div>
					</Col>
					<Col xs={12} sm={12} md={6} lg={4} xl={4}>
						<div className="blog">
							<div className="title">Blog điện ảnh</div>
							{blog?.map((item) => {
								return (
									<div key={item.key} className="blog-item">
										{item.name}
									</div>
								);
							})}
						</div>
					</Col>
					<Col xs={12} sm={12} md={6} lg={4} xl={4}>
						<div className="cinemas">
							<div className="title">Rạp chiếu phim</div>
							{cinemas?.map((item) => {
								return (
									<div
										key={item.key}
										className="cinemas-item"
									>
										{item.name}
									</div>
								);
							})}
						</div>
					</Col>
					{/* <Col xs={12} sm={12} md={6} lg={4} xl={4}></Col> */}
					<Col xs={12} sm={12} md={6} lg={8} xl={12}>
						<div className="customer-care">
							<div className="title">CHĂM SÓC KHÁCH HÀNG</div>
							<div style={{display:'inline-block'}} className="address">
								Địa chỉ: Tòa nhà Trong Mơ, Số 100 Phạm Văn Đồng,
								Phường 12,<br/> Quận Bình Thạnh, Thành phố Hồ Chí
								Minh
							</div>
							<div className="hotline">
								Hotline: <strong>1900 0000 99</strong>{" "}
								(1000đ/phút)
							</div>
							<div className="email">
								Email: <strong>example@gmail.com</strong>
							</div>

							<div className="switchboard">
								Tổng đài gọi ra: <strong>0123.456.789</strong>
							</div>
							{/* <div className="help">
								<div className="left">
									<GitlabOutlined />
								</div>

								<div className="right">
									<p className="text">Hướng dẫn trợ giúp trên <br/><strong>MegaMovie</strong></p>
								</div>
							</div>

							<div className="app-content">
								<div className="app-store">
									<div className="left">
										<AppleFilled />
									</div>

									<div className="right">
										<span>Tải về trên </span>

										<strong>App Store</strong>
									</div>
								</div>
								<div className="google-play">
									<div className="left">
										<CaretRightFilled />
									</div>

									<div className="right">
										<span>Tải về trên </span>

										<strong>Google Play</strong>
									</div>
								</div>
							</div> */}
						</div>
					</Col>
				</Row>

				<Row
					gutter={[0,16]}
					style={{
						marginTop: 10,
						paddingTop: 20,
						borderTop: "1px solid gray",
					}}
				>
					<Col xs={24} sm={24} md={24} lg={12} xl={12}>
						<div className="company-desc">
							<div className="logo">
								<img src={logoSonic} alt="" />
							</div>
							<div className="desc">
								<div className="title">
									Công ty cổ phần dịch vụ web Sonic Movie
								</div>
								<div className="address">
									Tầng 7, Tòa nhà Landmark 81, Số 100 Điện
									Biên Phủ, Quận Bình Thạnh, Thành phố Hồ Chí
									Minh
								</div>
							</div>
						</div>
					</Col>
					<Col xs={24} sm={12} md={12} lg={4} xl={4}>
						<div className="social">
							<div className="icon">
								<img src={fb} alt=""></img>
								<img src={zalo} alt=""></img>
								<img src={twitter} alt=""></img>
								<img src={instagram} alt=""></img>
							</div>
							<div className="desc">©Copyright 2022</div>
						</div>
					</Col>
					<Col xs={24} sm={12} md={12} lg={8} xl={8}>
						<div className="copy-right">
							<img src={copyright} alt=""></img>
						</div>
					</Col>
				</Row>
			</div>
		</div>
	);
}

export default Footer;
