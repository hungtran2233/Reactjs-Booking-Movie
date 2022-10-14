import {
	FileTextOutlined,
	LockOutlined,
	MailOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Button, Col, Input, Row, Spin } from "antd";
import { fetchUpdateProfileAction } from "features/authentication/utils/authAction";
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import * as yup from "yup";

function UpdateUser() {
	// dispatch to update Profile
	const dispatch = useDispatch();
	const history = useHistory();
	const userInfo = useSelector((state) => state.auth.profile);

	const updateUser = (user) => {
		dispatch(fetchUpdateProfileAction(user));
	};

	// Validation Form
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			taiKhoan: userInfo?.taiKhoan,
			matKhau: userInfo?.matKhau,
			hoTen: userInfo?.hoTen,
			email: userInfo?.email,
			soDT: userInfo?.soDT,
		},
		onSubmit: (user) => {
			console.log(user);

			updateAlert();
			const newUser = {
				...user,
				maNhom: "GP03",
				maLoaiNguoiDung: "KhachHang",
			};
			// console.log(newUser);
			updateUser(newUser);
		},
	});
	// Setting alert
	const updateAlert = () => {
		Swal.fire({
			title: "Bạn có muốn cập nhật không ?",
			text: "Nếu cập nhật, thông tin cũ sẽ thay đổi !",
			icon: "info",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			cancelButtonText: "Hủy",
			confirmButtonText: "Cập nhật!",
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Cập nhật thành công !",
					text: "Hãy xem lại thông tin cá nhân của bạn!",
					showConfirmButton: false,
					timer: 1500,
				});
				history.push("/");
			}
		});
	};

	if (!userInfo) {
		return (
			<div>
				<Spin size="large" />
			</div>
		);
	}

	return (
		<div className="UpdateUser">
			<div className="content-left">
				<h3>Thông tin cá nhân</h3>
				<form onSubmit={formik.handleSubmit} className="form">
					<div className="form-group">
						<label htmlFor="">Tài khoản:</label>
						<Input
							name="taiKhoan"
							className="input"
							type="text"
							placeholder="Username"
							prefix={<UserOutlined style={{ marginRight: 8 }} />}
							value={formik.values.taiKhoan}
							disabled
						/>
						{formik.touched.taiKhoan && formik.errors.taiKhoan && (
							<p className="errorText">
								{formik.errors.taiKhoan}
							</p>
						)}
					</div>

					<div className="form-group">
						<label htmlFor="">Mật khẩu:</label>
						<Input
							name="matKhau"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className="input"
							type="text"
							placeholder="Password"
							prefix={<LockOutlined style={{ marginRight: 8 }} />}
							value={formik.values.matKhau}
						/>
						{formik.touched.matKhau && formik.errors.matKhau && (
							<p className="errorText">{formik.errors.matKhau}</p>
						)}
					</div>

					<div className="form-group">
						<label htmlFor="">Họ tên:</label>
						<Input
							name="hoTen"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className="input"
							type="text"
							placeholder="FullName"
							prefix={
								<FileTextOutlined style={{ marginRight: 8 }} />
							}
							value={formik.values.hoTen}
						/>
						{formik.touched.hoTen && formik.errors.hoTen && (
							<p className="errorText">{formik.errors.hoTen}</p>
						)}
					</div>

					<div className="form-group">
						<label htmlFor="">Email:</label>
						<Input
							name="email"
							className="input"
							type="text"
							placeholder="Email"
							prefix={<MailOutlined style={{ marginRight: 8 }} />}
							value={formik.values.email}
							disabled
						/>
						{formik.touched.email && formik.errors.email && (
							<p className="errorText">{formik.errors.email}</p>
						)}
					</div>

					<div className="form-group">
						<label htmlFor="">Số điện thoại:</label>
						<Input
							name="soDT"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className="input"
							type="text"
							placeholder="Phone"
							prefix={<UserOutlined style={{ marginRight: 8 }} />}
							value={formik.values.soDT}
						/>

						{formik.touched.soDT && formik.errors.soDT && (
							<p className="errorText">{formik.errors.soDT}</p>
						)}
					</div>

					<div className="form-group">
						<label htmlFor="">Loại người dùng:</label>
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
							htmlType="submit"
							type="primary"
							className="btn-submit"
						>
							Cập nhật
						</Button>

						<Button
							type="default"
							className="btn-back"
							onClick={() => history.push("/")}
						>
							Hủy
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default UpdateUser;
