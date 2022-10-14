import React, { useEffect } from "react";
import {
	FileTextOutlined,
	LockOutlined,
	MailOutlined,
	PhoneOutlined,
	ToolOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, Modal, Row, Spin } from "antd";
import instance from "api/instance";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import {
	fetchProfileAction,
	fetchUpdateProfileAction,
	signUpAction,
} from "../utils/authAction";
import Swal from "sweetalert2";
import { formatDateString } from "common/utils/dateString";
import TicketDetail from "./components/TicketDetail";
import ScrollToTop from "features/movies/components/ScrollToTop";

function Profile() {
	// dispatch to update Profile
	const dispatch = useDispatch();

	// go back current page
	const history = useHistory();
	const goBack = () => {
		history.push("/");
	};

	const fetchProfile = () => {
		dispatch(fetchProfileAction());
	};

	useEffect(() => {
		fetchProfile();
	}, []);

	const userInfo = useSelector((state) => state.auth.profile);

	if (!userInfo) return <Spin size="large" />;

	return (
		<div className="Profile">
			{/* {console.log(selectedUser.hoTen)} */}
			<ScrollToTop />
			<div className="container">
				<div className="content-info">
					<Row>
						<Col xs={24} sm={24} md={24} lg={24} xl={24}>
							<div className="content-left">
								<h3>Thông tin cá nhân</h3>
								<form className="form">
									<div className="form-group">
										<label htmlFor="">Tài khoản:</label>
										<Input
											name="taiKhoan"
											className="input"
											type="text"
											placeholder="Username"
											prefix={
												<UserOutlined
													style={{ marginRight: 8 }}
												/>
											}
											value={userInfo.taiKhoan}
											disabled
										/>
									</div>

									<div className="form-group">
										<label htmlFor="">Mật khẩu:</label>
										<Input
											name="matKhau"
											className="input"
											type="password"
											placeholder="Password"
											prefix={
												<LockOutlined
													style={{ marginRight: 8 }}
												/>
											}
											value={userInfo.matKhau}
											disabled
										/>
									</div>

									<div className="form-group">
										<label htmlFor="">Họ tên:</label>
										<Input
											name="hoTen"
											className="input"
											type="text"
											placeholder="FullName"
											prefix={
												<FileTextOutlined
													style={{ marginRight: 8 }}
												/>
											}
											value={userInfo.hoTen}
											disabled
										/>
									</div>

									<div className="form-group">
										<label htmlFor="">Email:</label>
										<Input
											name="email"
											className="input"
											type="text"
											placeholder="Email"
											prefix={
												<MailOutlined
													style={{ marginRight: 8 }}
												/>
											}
											value={userInfo.email}
											disabled
										/>
									</div>

									<div className="form-group">
										<label htmlFor="">Số điện thoại:</label>
										<Input
											name="soDT"
											className="input"
											type="text"
											placeholder="Phone"
											prefix={
												<UserOutlined
													style={{ marginRight: 8 }}
												/>
											}
											value={userInfo.soDT}
											disabled
										/>
									</div>

									<div className="form-group">
										<label htmlFor="">
											Loại người dùng:
										</label>
										<Input
											name="soDT"
											className="input"
											type="text"
											placeholder="Phone"
											value={userInfo.maLoaiNguoiDung}
											disabled
										/>
									</div>

									<div className="btn-handle">
										<Button
											type="primary"
											className="btn-submit"
											onClick={() => {
												history.push("/update-user");
											}}
										>
											Thay đổi thông tin
										</Button>

										<Button
											onClick={goBack}
											type="default"
											className="btn-back"
										>
											Trở về
										</Button>
									</div>
								</form>
							</div>
						</Col>
						<Col xs={24} sm={24} md={24} lg={24} xl={24}>
							<TicketDetail userInfo={userInfo} />
						</Col>
					</Row>
				</div>
			</div>
		</div>
	);
}

export default Profile;
