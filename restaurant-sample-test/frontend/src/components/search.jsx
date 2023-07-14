import { useState } from "react";

function Search(props) {
	const [search, setSearch] = useState([]);

	function onChangeSearch(name) {
		const searchName = name.target.value;
		setSearch(searchName);
	}

    function findBy() {
		props.find(search, props.by);
	}

	return (
		<div className="input-group col-lg-4 m-1">
			<input
				type="text"
				className="form-control"
				placeholder={"Search by " + props.by}
				value={search}
				onChange={onChangeSearch}
			/>
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

export default Search;
