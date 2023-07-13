import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Review from "./components/review";
import Login from "./components/login";
import Restaurant from "./components/restaurant";
import RestaurantsList from "./components/restaurants-list";
import NavBar from "./components/navbar";

function App() {
	const [user, setUser] = useState(null);

	async function login(user = null) {
		setUser(user);
	}

	async function logout() {
		setUser(null);
	}

	return (
		<div>
			<NavBar logout={logout} user={user} />

			<div className="container" style={{ marginTop: "7vh" }}>
				<Routes>
					<Route exact path="/" element={<RestaurantsList />} />
					<Route
						exact
						path="/restaurants"
						element={<RestaurantsList />}></Route>
					<Route
						path="/restaurants/:id/review"
						element={<Review user={user} />}
					/>
					<Route path="/restaurants/:id" element={<Restaurant user={user} />} />
					<Route path="/login" element={<Login login={login} />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
