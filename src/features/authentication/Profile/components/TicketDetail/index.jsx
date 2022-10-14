import { Spin } from "antd";
import instance from "api/instance";
import { formatDateString } from "common/utils/dateString";
import { formatPriceVND } from "common/utils/formatPriceVND";
import {
	fetchProfileAction,
	fetchUserAction,
} from "features/authentication/utils/authAction";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function TicketDetail() {
	const dispatch = useDispatch();
	const fetchUser = () => {
		dispatch(fetchUserAction());
	};

	useEffect(() => {
		fetchUser();
	}, []);

	const userInfo = useSelector((state) => state.auth.user);

	if (!userInfo) {
		return (
			<div>
				<Spin size="large" />
			</div>
		);
	}

	return (
		<div>
			<div className="content-right">
				<h3>Chi tiết đặt vé</h3>
				{userInfo?.thongTinDatVe.map((item) => {
					return (
						<div key={item.maVe} className="ticket-group">
							<div className="info">
								<div className="left">
									<img src={item.hinhAnh} alt="" />
								</div>
								<div className="right">
									<div className="group">
										<div className="title">Mã vé: </div>
										<div className="data">{item.maVe} </div>
									</div>
									<div className="group">
										<div className="title">Tên phim: </div>
										<div className="data">
											{item.tenPhim}{" "}
										</div>
									</div>
									<div className="group">
										<div className="title">Ngày đặt: </div>
										<div className="data">
											{formatDateString(item.ngayDat)}
										</div>
									</div>
									<div className="group">
										<div className="title">
											Thời lượng phim:
										</div>
										<div className="data">
											{item.thoiLuongPhim + " phút"}
										</div>
									</div>
									<div className="group">
										<div className="title">Giá vé:</div>
										<div className="data">
											{item.giaVe + " VND"}
										</div>
									</div>
								</div>
							</div>

							<div className="seat">
								<h4>Thông tin rạp và ghế đã đặt</h4>
								<table className="table">
									<thead>
										<tr>
											<th>STT</th>
											<th>Tên hệ thống rạp</th>
											<th>Tên rạp</th>
											<th>Số ghế</th>
										</tr>
									</thead>
									<tbody>
										{item.danhSachGhe.map(
											(item2, index) => {
												return (
													<tr key={index}>
														<td>{index + 1}</td>
														<td>
															{
																item2.tenHeThongRap
															}
														</td>
														<td>{item2.tenRap}</td>
														<td>{item2.tenGhe}</td>
													</tr>
												);
											}
										)}
									</tbody>
									<tfoot>
										<tr>
											<td colSpan={2}></td>
											<td>Tổng tiền</td>
											<td>
												{formatPriceVND(
													item.giaVe *
														item.danhSachGhe.length
												)}
											</td>
										</tr>
									</tfoot>
								</table>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default TicketDetail;
