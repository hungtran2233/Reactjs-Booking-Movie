import React, { useEffect, useState } from "react";
import { Layout, Menu, Spin } from "antd";
import {
	UserOutlined,
	CalendarOutlined,
	HomeOutlined,
} from "@ant-design/icons";
import instance from "api/instance";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileAction } from "features/authentication/utils/authAction";
import logoSonic from "../../../assets/img/icon/logo-sonic.png";
import Swal from "sweetalert2";
import { Link } from "react-scroll";
import SearchBar from "./components/SearchBar";

const Header = () => {
	const [current, setCurrent] = useState("");
	const dispatch = useDispatch();
	//

	// go to Sign In --by Hung
	const history = useHistory();
	const goToSignIn = () => {
		history.push("/signin");
	};
	const goToProfile = () => {
		history.push("/profile");
	};
	const goToHome = () => {
		history.push("/");
	};

	// Logout
	const logout = () => {
		Swal.fire({
			title: "Bạn có muốn đăng xuất không ?",
			text: "Nếu đăng xuất, bạn sẽ không thể đặt vé !",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			cancelButtonText: "Hủy",
			confirmButtonText: "Đăng xuất!",
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Đăng xuất thành công !",
					text: "Gặp lại bạn sau!",
					showConfirmButton: false,
					timer: 1500,
				});
				///////
				// 1) Remove token localStorage
				localStorage.removeItem("token");
				localStorage.removeItem("login");

				// 2) Set profile Store --> null
				dispatch(fetchProfileAction({ payload: null }));
				goToHome();
			}
		});
	};

	const onClick = (e) => {
		// console.log(e);
		setCurrent(e.key);
		// Add by Hung
		if (e.key === "5") {
			goToSignIn();
		}
		if (e.key === "profile-1") {
			goToProfile();
		}
		if (e.key === "6") {
			logout();
		}
		// Scroll element
	};

	const items = [
		{
			label: "Rạp Chiếu",
			key: "sub-1",
			icon: <HomeOutlined />,
			children: [
				{
					label: <Link to="cinemasGroup">CGV</Link>,
					key: "1",
				},
				{
					label: <Link to="cinemasGroup">GALAXY</Link>,
					key: "2",
				},
				{
					label: <Link to="cinemasGroup">CINE STAR</Link>,
					key: "7",
				},
				{
					label: "BHD Star Cineplex",
					key: "8",
				},
				{
					label: "LotteCinima",
					key: "9",
				},
				{
					label: "MegaGS",
					key: "10",
				},
			],
		},
		{
			label: "Lịch Chiếu",
			key: "sub-2",
			icon: <CalendarOutlined />,
			children: [
				{
					label: <Link to="nowShowing">Phim Đang Chiếu</Link>,
					key: "child-1",
				},
				{
					label: <Link to="upComing">Phim Sắp Chiếu</Link>,
					key: "child-2",
				},
				{
					label: <Link to="filterMovieId">Lịch Chiếu Theo Rạp</Link>,
					key: "child-3",
				},
				{
					label: <Link to="trailerId">Trailer Mới Nhất</Link>,
					key: "child-4",
				},
			],
		},
		{
			label: "Đăng Nhập",
			key: "sub-3",
			icon: <UserOutlined />,
			children: [
				{
					label: "Đăng Nhập",
					key: "5",
				},
			],
		},
	];

	//format Ho Ten
	const formatName = (name) => {
		let newName = name.trim();
		for (let i = newName.length; i > 0; i--) {
			if (newName[i] === " ") {
				return newName.slice(i + 1, newName.length);
			}
		}
		return newName;
	};

	// toUpperCase Name
	function upperCaseFirst(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	// Setting Profile
	const userProfile = useSelector((state) => state.auth.profile);
	const renderUserInfo = () => {
		if (userProfile) {
			items[2].label = `Hi,  ${upperCaseFirst(
				formatName(userProfile.hoTen)
			)}`;
			items[2].children[0] = {
				label: "Thông tin cá nhân",
				key: "profile-1",
			};

			items[2].children[1] = {
				label: "Đăng Xuất",
				key: "6",
			};
		}
	};

	return (
		<Layout
			className="Header"
			style={{ display: "block", backgroundColor: "#fff" }}
		>
			<div className="container">
				<Layout.Header className="navbar">
					<div className="left">
						<div className="logo" onClick={goToHome}>
							<img src={logoSonic} alt=""></img>
						</div>
						<div className="ticket">
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

							<p onClick={goToHome} style={{ cursor: "pointer" }}>
								Đặt Vé <br /> Xem Phim
							</p>
						</div>
					</div>
					{/* Created --by Hung */}
					<div className="middle">
						<SearchBar />
					</div>
					<Menu
						onClick={onClick}
						selectedKeys={[current]}
						mode="horizontal"
						className="right"
						items={items}
					/>
					{renderUserInfo()}
				</Layout.Header>
			</div>
		</Layout>
	);
};

export default Header;
