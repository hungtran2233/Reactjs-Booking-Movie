import { Modal } from "antd";
import { formatDate } from "common/utils/date";
import { formatDateString } from "common/utils/dateString";
import DateTheater from "features/movies/pages/home/components/filterMovies/components/date-custom/DateTheater";
import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import "./_theaterInfo.scss";

function TheaterInfo(props) {
	const { tenCumRap, diaChi, hinhAnh, lichChieuPhim } = props.theaterInfo;
	const movieInfo = props.selectedMovie;

	// go to booking
	const history = useHistory();
	const goToBooking = (idPremiere) => {
		const login = localStorage.getItem("login");

		if (login === "true") history.push("/booking/" + idPremiere);

		if (login !== "true") history.push("/signin");
	};

	// Format price
	const formatPrice = (price) => {
		let newPrice = new Intl.NumberFormat("it-IT", {
			style: "currency",
			currency: "VND",
		}).format(price);
		return newPrice;
	};

	const time = lichChieuPhim.map((item) => {
		return (
			<div key={item.maLichChieu} className="schedule-content">
				<DateTheater time={item} goToBooking={goToBooking} />
				<div className="price">{formatPrice(item.giaVe)}</div>
			</div>
		);
	});

	// Setting modal for Google Map
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<div className="TheaterInfo">
			<div className="body-info">
				<div className="left">
					<div className="movie-img">
						<img src={movieInfo.hinhAnh} alt="" />
					</div>
					<div className="show-time">
						<p>Khởi chiếu</p>
						<h3>{formatDateString(movieInfo.ngayKhoiChieu)}</h3>
					</div>
				</div>
				<div className="right">
					{lichChieuPhim?.map((item) => {
						return (
							<div
								key={item.maLichChieu}
								className="schedule-content"
							>
								<div className="date-item">
									<DateTheater
										time={item}
										goToBooking={goToBooking}
									/>
								</div>

								<div className="price">
									{formatPrice(item.giaVe)}
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className="bottom-info">
				<div className="logo">
					<img src={hinhAnh} alt="" />
				</div>
				<div className="address">
					<div>{tenCumRap}</div>
					<p className="info">{diaChi}</p>
					<p className="link-google" onClick={showModal}>
						Xem bản đồ
					</p>

					<Modal
						title={diaChi}
						open={isModalOpen}
						onOk={handleOk}
						onCancel={handleCancel}
					>
						<div>
							Đang có lỗi !!!
							{/* <iframe
								src=""
								width="600"
								height="450"
								style="border:0;"
								loading="lazy"
								referrerpolicy="no-referrer-when-downgrade"
							></iframe> */}
						</div>
					</Modal>
				</div>
			</div>
		</div>
	);
}

export default TheaterInfo;
