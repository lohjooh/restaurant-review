import { useState, useEffect } from "react";
import RestaurantDS from "./services/restaurant.js";
import { Link } from "react-router-dom";

function RestaurantsList() {
	const [restaurants, setRestaurants] = useState([]);
	const [searchName, setSearchName] = useState([]);
	const [searchZip, setSearchZip] = useState([]);
	const [searchCuisine, setSearchCuisine] = useState([]);
	const [cuisines, setCuisines] = useState(["All Cuisines"]);

	useEffect(() => {
		retrieveRestaurants();
		retrieveCuisines();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function onChangeSearchName(name) {
		const searchName = name.target.value;
		setSearchName(searchName);
	}

	function onChangeSearchZip(name) {
		const searchName = name.target.value;
		setSearchZip(searchName);
	}

	function onChangeSearchCuisine(name) {
		const searchName = name.target.value;
		setSearchCuisine(searchName);
	}

	function refreshList() {
		retrieveRestaurants();
	}

	async function retrieveRestaurants() {
		try {
			const res = await RestaurantDS.getAll();
			setRestaurants(res.data.restaurants);
		} catch (err) {
			console.error(err);
		}
	}

	async function retrieveCuisines() {
		try {
			const res = await RestaurantDS.getCuisines();
			setCuisines(cuisines.concat(cuisines, res.data));
		} catch (err) {
			console.error(err);
		}
	}

	async function find(query, by) {
		try {
			const res = await RestaurantDS.find(query, by);
			setRestaurants(res.data.restaurants);
		} catch (err) {
			console.error(err);
		}
	}

	function findByName() {
		find(searchName, "name");
	}

	function findByZip() {
		find(searchZip, "zipcode");
	}

	function findByCuisine() {
		if (searchCuisine === "All Cuisines") {
			refreshList();
		} else {
			find(searchCuisine, "cuisine");
		}
	}

	return (
		<div>
			<div className="row pb-1">
				<div className="input-group col-lg-4">
					<input
						type="text"
						className="form-control"
						placeholder="Search by name"
						value={searchName}
						onChange={onChangeSearchName}
					/>
					<div className="input-group-append">
						<button
							className="btn btn-outline-secondary"
							type="button"
							onClick={findByName}>
							Search
						</button>
					</div>
				</div>
				<div className="input-group col-lg-4">
					<input
						type="text"
						className="form-control"
						placeholder="Search by zip"
						value={searchZip}
						onChange={onChangeSearchZip}
					/>
					<div className="input-group-append">
						<button
							className="btn btn-outline-secondary"
							type="button"
							onClick={findByZip}>
							Search
						</button>
					</div>
				</div>
				<div className="input-group col-lg-4">
					<select onChange={onChangeSearchCuisine}>
						{cuisines.map((cuisine) => {
							return <option value={cuisine}> {cuisine.substr(0, 20)} </option>;
						})}
					</select>
					<div className="input-group-append">
						<button
							className="btn btn-outline-secondary"
							type="button"
							onClick={findByCuisine}>
							Search
						</button>
					</div>
				</div>
			</div>
			<div className="row">
				{restaurants.map((restaurant) => {
					const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
					return (
						<div className="col-lg-4 pb-1">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">{restaurant.name}</h5>
									<p className="card-text">
										<strong>Cuisine: </strong>
										{restaurant.cuisine}
										<br />
										<strong>Address: </strong>
										{address}
									</p>
									<div className="row">
										<Link
											to={"/restaurants/" + restaurant._id}
											className="btn btn-primary col-lg-5 mx-1 mb-1">
											View Reviews
										</Link>
										<a
											target="_blank"
											rel="noreferrer"
											href={"https://www.google.com/maps/place/" + address}
											className="btn btn-primary col-lg-5 mx-1 mb-1">
											View Map
										</a>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default RestaurantsList;
