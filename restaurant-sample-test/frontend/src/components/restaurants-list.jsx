import { useState, useEffect } from "react";

import RestaurantDS from "./services/restaurant.js";
import Pagebar from "./pagebar.jsx";
import Search from "./search.jsx";
import CuisinesSearch from "./cuisines.jsx";
import RestaurantCard from "./restaurant-card.jsx";

function RestaurantsList() {
	const [restaurants, setRestaurants] = useState([]);
	const [pageInfo, setPageInfo] = useState({
		page: 1,
		totalRestaurantsFound: 1,
		resultsPerPage: 1,
	});
	const [lastQuery, setLastQuery] = useState({
		query: "",
		by: "",
	});

	const { page, totalRestaurantsFound, resultsPerPage } = pageInfo;

	useEffect(() => {
		retrieveRestaurants();
	}, []);

	function refreshList() {
		retrieveRestaurants();
	}

	function parseData(res) {
		const { restaurants, ...dataPageInfo } = res.data;
		setRestaurants(restaurants);
		setPageInfo(dataPageInfo);
	}

	async function retrieveRestaurants() {
		try {
			const res = await RestaurantDS.getAll();
			parseData(res);
		} catch (err) {
			console.error(err);
		}
	}

	async function find(query, by, pageNum = 1) {
		try {
			const res = await RestaurantDS.find(query, by, pageNum);
			parseData(res);
			setLastQuery({ query, by });
		} catch (err) {
			console.error(err);
		}
	}

	function next() {
		const { query, by } = lastQuery;
		find(query, by, parseInt(page) + 1);
	}

	function prev() {
		const { query, by } = lastQuery;
		find(query, by, parseInt(page) - 1);
	}

	return (
		<div>
			<div className="row pb-1">
				<Search by="name" find={find} />
				<Search by="zipcode" find={find} />
				<CuisinesSearch refreshList={refreshList} find={find} />
			</div>
			<div className="row align-middle justify-content-center">
				{restaurants.map((restaurant, index) => {
					const address =
						restaurant.address.building +
						" " +
						restaurant.address.street +
						" " +
						restaurant.address.zipcode;
					return (
						<RestaurantCard
							key={index}
							name={restaurant.name}
							cuisine={restaurant.cuisine}
							_id={restaurant._id}
							address={address}
						/>
					);
				})}
				{!restaurants.length && (
					<p className="text-center fs-1 mt-5 mb-5 pt-5 pb-5">
						No matching restaurants found
					</p>
				)}
			</div>
			<br />
			<Pagebar
				page={page}
				total={totalRestaurantsFound}
				limit={resultsPerPage}
				next={next}
				prev={prev}
			/>
		</div>
	);
}

export default RestaurantsList;
