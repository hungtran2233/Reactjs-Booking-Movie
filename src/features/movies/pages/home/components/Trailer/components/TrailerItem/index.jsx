import React from "react";
import YouTube from "react-youtube";
import { Button, Modal } from "antd";
import { useState } from "react";
import { PlayCircleOutlined } from "@ant-design/icons";

function TrailerItem(props) {
	const { maPhim, tenPhim, moTa, hinhAnh, trailer, danhGia } = props.item;

	const [isModalOpen, setIsModalOpen] = useState(false);

	// Modal of Ant Design
	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	// Setup <Youtube/>
	const opts = {
		height: "350",
		width: "600",

		playerVars: {
			autoplay: 1,
		},
	};

	const onReady = (event) => {
		// access to player in all event handlers via event.target
		event.target.pauseVideo();
	};

	// Get id to use <Youtube />
	const getId = (str) => {
		let count = str.length;
		let index = str.indexOf("=") + 1;
		if (str.indexOf(".be/") !== -1) {
			index = str.indexOf(".be/") + 4;
		}
		let id = str.slice(index, count);
		return id;
	};

	return (
		<div className="TrailerItem">
			<div className="card">
				<div className="card-top" onClick={showModal}>
					<img src={hinhAnh} alt="" />
					<div className="icon-play">
						<PlayCircleOutlined className="btn-play" />
					</div>
				</div>
				<div className="card-body">
					<h3 className="movie-title">{tenPhim}</h3>
				</div>

				<Modal
					bodyStyle={{
						height: 500,
						padding: 0,
						background: "#171717",
					}}
					width={600}
					style={{
						position: "relative",
					}}
					closable={true}
					open={isModalOpen}
					onCancel={handleCancel}
					footer={null}
				>
					<YouTube
						videoId={getId(trailer)}
						opts={opts}
						onReady={onReady}
					/>
					<div style={{ display: "flex" }}>
						<div
							style={{
								width: "20%",
								borderRadius: "8px",
								overflow: "hidden",
							}}
						>
							<img
								src={hinhAnh}
								style={{
									width: "100%",
									height: "80%",
									objectFit: "cover",
									padding: "5px",
								}}
								alt=""
							/>
						</div>
						<div style={{ width: "80%", margin: "5px 10px" }}>
							<h3 style={{ color: "white", fontSize: 20 }}>
								{tenPhim}
							</h3>
							<p
								style={{
									color: "gray",
									fontSize: 14,
								}}
							>
								{moTa.substr(0, 280) + "..."}
							</p>
						</div>
					</div>
				</Modal>
			</div>
		</div>
	);
}

export default TrailerItem;
