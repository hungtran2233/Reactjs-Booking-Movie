import {
	FileTextOutlined,
	LockOutlined,
	MailOutlined,
	PhoneOutlined,
	ToolOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import instance from "api/instance";
import { getCaptcha } from "common/utils/captcha";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { signUpAction } from "../utils/authAction";
// import './_signUp.scss'

const schema = yup.object({
	taiKhoan: yup
		.string()
		.required("*Trường này bắt buộc nhập !")
		.min(6, "*Tài khoản tối thiểu 6 kí tự"),
	matKhau: yup
		.string()
		.required("*Trường này bắt buộc nhập !")
		.min(6, "*Mật khẩu phải từ 6 đến 14 kí tự"),
	hoTen: yup
		.string()
		.required("*Trường này bắt buộc nhập !")
		.matches(/^[A-Za-z ]+$/g, "*Họ tên không đúng"),
	email: yup
		.string()
		.required("*Trường này bắt buộc nhập !")
		.email("*Email không đúng định dạng"),
	soDt: yup.string().required("*Trường này bắt buộc nhập !"),
});

function SignUp() {
	const dispatch = useDispatch();
	// Set loading when click button submit (sign up)
	const [isLoading, setIsLoading] = useState(false);
	const history = useHistory();
	//go to signIn
	const goToSignIn = () => {
		history.push("/signin");
	};

	// Setting Captcha
	const inputCaptcha = useRef(null);
	const captcha = useRef(null);

	// Setting modal
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Validation Form
	const formik = useFormik({
		initialValues: {
			taiKhoan: "",
			matKhau: "",
			hoTen: "",
			email: "",
			soDt: "",
		},
		onSubmit: (user) => {
			const newUser = { ...user, maNhom: "GP03" };
			signUp(newUser);
		},
		validationSchema: schema,
	});

	const checkCaptcha = () => {
		const leftCaptcha = inputCaptcha.current.value;
		const rightCaptcha = captcha.current.value;
		// console.log(leftCaptcha);
		// console.log(rightCaptcha);
		if (leftCaptcha !== rightCaptcha) {
			return alert("Sai mã captcha rồi, hãy nhập lại !");
		} else {
			return true;
		}
	};

	const signUp = async (user) => {
		//check captcha
		if (checkCaptcha()) {
			// console.log("dung");
			// show icon loading
			setIsLoading(true);
			const data = await dispatch(signUpAction(user));
			if (!data.payload) {
				setIsLoading(false);
				return alert("Tài khoản hoặc email đã tồn tại, vui lòng nhập lại !");
			} else {
				setIsLoading(false);
				alert("Đăng kí thành công !");
				history.push("/signin");
			}
			setIsLoading(false);
		}
	};

	// Setting modal

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
		<div className="SignUp" style={{ backgroundImage: "url(/bg/bgSignup.jpg)" }}>
			<div className="container">
				<div className="content">
					<h2 className="title">Đăng kí tài khoản</h2>

					<form onSubmit={formik.handleSubmit} className="form">
						<div className="form-group">
							<div className="form-body">
								<label htmlFor="">Tài khoản:</label>
								<Input
									name="taiKhoan"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									className="input"
									type="text"
									placeholder="Username"
									prefix={<UserOutlined style={{ marginRight: 8 }} />}
								/>
							</div>

							{formik.touched.taiKhoan && formik.errors.taiKhoan && (
								<p className="errorText">{formik.errors.taiKhoan}</p>
							)}
						</div>

						<div className="form-group">
							<div className="form-body">
								<label htmlFor="">Mật khẩu:</label>
								<Input
									name="matKhau"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									className="input"
									type="password"
									placeholder="Password"
									prefix={<LockOutlined style={{ marginRight: 8 }} />}
								/>
							</div>
							{formik.touched.matKhau && formik.errors.matKhau && (
								<p className="errorText">{formik.errors.matKhau}</p>
							)}
						</div>

						<div className="form-group">
							<div className="form-body">
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
								/>
							</div>
							{formik.touched.hoTen && formik.errors.hoTen && (
								<p className="errorText">{formik.errors.hoTen}</p>
							)}
						</div>

						<div className="form-group">
							<div className="form-body">
								<label htmlFor="">Email:</label>
								<Input
									name="email"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									className="input"
									type="text"
									placeholder="Email"
									prefix={<MailOutlined style={{ marginRight: 8 }} />}
								/>
							</div>
							{formik.touched.email && formik.errors.email && (
								<p className="errorText">{formik.errors.email}</p>
							)}
						</div>

						<div className="form-group">
							<div className="form-body">
								<label htmlFor="">Số điện thoại:</label>
								<Input
									name="soDt"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									className="input"
									type="text"
									placeholder="Phone"
									prefix={<PhoneOutlined style={{ marginRight: 8 }} />}
								/>
							</div>
							{formik.touched.soDt && formik.errors.soDt && (
								<p className="errorText">{formik.errors.soDt}</p>
							)}
						</div>

						<div className="captcha">
							<div className="cap-title">Nhập mã Captcha:</div>
							<div className="left">
								<input ref={inputCaptcha} />
							</div>
							<div className="right">
								<input
									ref={captcha}
									defaultValue={getCaptcha()}
									disabled
								/>
							</div>
						</div>

						<div className="term">
							<Checkbox>Chấp nhận các điều khoản</Checkbox>
							<span
								onClick={showModal}
								style={{ color: "blue", marginLeft: 20 }}
							>
								Điều khoản
							</span>
							<Modal
								title="Basic Modal"
								open={isModalOpen}
								onOk={handleOk}
								onCancel={handleCancel}
							>
								<p>Some contents...</p>
								<p>Some contents...</p>
								<p>Some contents...</p>
							</Modal>
						</div>

						<Button
							htmlType="submit"
							type="primary"
							className="btn-submit"
							loading={isLoading}
						>
							Tạo tài khoản
						</Button>
					</form>

					<div className="signin-tips">
						<p>Bạn đã có tài khoản ?</p>
						<Button
							type="primary"
							className="btn-signin"
							onClick={goToSignIn}
						>
							Đăng nhập
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SignUp;
