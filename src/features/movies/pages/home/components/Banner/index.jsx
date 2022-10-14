import { Col, Layout, Row, Spin } from "antd";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBannerAction } from "./utils/bannerAction";
//Slider
import Slider from "react-slick";
import "antd/dist/antd.css";
// Icon
import { CheckCircleOutlined } from "@ant-design/icons";
import SampleNextArrow from "../SliderArrow/SampleNextArrow";
import SamplePrevArrow from "../SliderArrow/SamplePrevArrow";
///////////
import { banners } from "./utils/bannerSelector";

function Banner() {
	const dispatch = useDispatch();
	const banner = useSelector(banners);

	const fetchBanner = () => {
		dispatch(fetchBannerAction());
	};

	useEffect(() => {
		fetchBanner();
	}, []);

	if (!banner) {
		return (
			<div style={{ textAlign: "center" }}>
				<Spin size="large" />
			</div>
		);
	}

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
	};

	return (
		<div className="Banner">
			<div className="container-fluid"></div>
			<Slider className="slider container" {...settings}>
				{banner?.map((item) => {
					return (
						<div key={item.maBanner} className=" card">
							<div className="card-left">
								<h1>Đặt vé xem phim nhanh chóng</h1>
								<div className="description">
									<div className="description-item">
										<CheckCircleOutlined
											style={{
												fontSize: 24,
												color: "#A50064",
											}}
										/>
										<div className="item-text">
											Du hí các rạp,{" "}
											<strong>
												trải nghiệm phim hay
											</strong>
										</div>
									</div>

									<div className="description-item">
										<CheckCircleOutlined
											style={{
												fontSize: 24,
												color: "#A50064",
											}}
										/>
										<div className="item-text">
											<strong>Đặt vé trực tiếp,</strong>{" "}
											thanh toán xong ngay
										</div>
									</div>

									<div className="description-item">
										<CheckCircleOutlined
											style={{
												fontSize: 24,
												color: "#A50064",
											}}
										/>
										<div className="item-text">
											Gợi ý cho bạn,{" "}
											<strong>suất chiếu gần đây</strong>
										</div>
									</div>

									<div className="description-item">
										<CheckCircleOutlined
											style={{
												fontSize: 24,
												color: "#A50064",
											}}
										/>
										<div className="item-text">
											<strong>Lịch sử đặt vé </strong>{" "}
											được lưu lại ngay
										</div>
									</div>
								</div>
							</div>
							<div className="card-right">
								<div className="card-img">
									<img src={item.hinhAnh} />
								</div>
							</div>
						</div>
					);
				})}
			</Slider>
		</div>
	);
}

export default Banner;
