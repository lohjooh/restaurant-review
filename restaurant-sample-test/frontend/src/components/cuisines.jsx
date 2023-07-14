import { useState, useEffect } from "react";

import RestaurantDS from "./services/restaurant.js";

function CuisinesSearch(props) {
	const [search, setSearch] = useState([]);
	const [cuisines, setCuisines] = useState(["All Cuisines"]);

	async function retrieveCuisines() {
		try {
			const res = await RestaurantDS.getCuisines();
			setCuisines(cuisines.concat(res.data));
		} catch (err) {
			console.error(err);
		}
	}

	useEffect(() => {
		retrieveCuisines();
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function onChangeSearch(name) {
		const searchName = name.target.value;
		setSearch(searchName);
	}

	function findBy() {
		if (search === "All Cuisines") {
			props.refreshList();
		} else {
			props.find(search, "cuisine");
		}
	}

	return (
		<div className="input-group col-lg-4 m-1">
			<select onChange={onChangeSearch}>
				{cuisines.map((item, index) => {
					return (
						<option key={index} value={item} title={item}>
							{" " + item.slice(0, 20) + " "}
						</option>
					);
				})}
			</select>
			<div className="input-group-append">
				<button
					className="btn btn-outline-secondary"
					type="button"
					onClick={findBy}>
					Search
				</button>
			</div>
		</div>
	);
}

export default CuisinesSearch;
