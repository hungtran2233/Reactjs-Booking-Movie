import "../App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "common/components/Header";

import { useDispatch } from "react-redux";
import { lazy, Suspense, useEffect, useState } from "react";
import { fetchProfileAction } from "features/authentication/utils/authAction";

import Footer from "common/components/Footer";
import { PrivateRoute } from "./Guard";

////
const Home = lazy(() => import("features/movies/pages/home"));
const Detail = lazy(() => import("features/movies/pages/detail"));
const Payment = lazy(() => import("features/movies/pages/payment"));
const Booking = lazy(() => import("features/movies/pages/booking_seats"));
const SignIn = lazy(() => import("features/authentication/signIn"));
const SignUp = lazy(() => import("features/authentication/signUp"));
const Profile = lazy(() => import("features/authentication/Profile"));
const UpdateUser = lazy(() =>
	import("features/authentication/Profile/components/UpdateUser")
);

function App() {
	// maintain my account --by Hung
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchProfileAction());
	}, []);

	return (
		<div>
			<Router>
				<Header />
				<Suspense
					fallback={
						<div style={{ textAlign: "center" }}>Đang tải...</div>
					}
				>
					<Switch>
						<Route path="/" component={Home} exact />
						<Route path="/detail/:id/:slug" component={Detail} />
						<Route path="/booking/:id" component={Booking} />
						<PrivateRoute
							path="/payment"
							component={Payment}
							redirectPath="/signin"
						/>
						<Route path="/signin" component={SignIn} />
						<Route path="/signup" component={SignUp} />
						<PrivateRoute
							path="/profile"
							component={Profile}
							redirectPath="/signin"
						/>
						<PrivateRoute
							path="/update-user"
							component={UpdateUser}
							redirectPath="/signin"
						/>
					</Switch>
				</Suspense>

				<Footer />
			</Router>
		</div>
	);
}

export default App;
