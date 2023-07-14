import { Link } from "react-router-dom";

function RestaurantCard(props) {
	return (
		<div className="col-lg-4 pb-1" key={props.key}>
			<div className="card m-1">
				<div className="card-body">
					<h5 className="card-title">{props.name}</h5>
					<p className="card-text">
						<strong>Cuisine: </strong>
						{props.cuisine}
						<br />
						<strong>Address: </strong>
						{props.address}
					</p>
					<div className="row justify-content-center">
						<Link
							to={"/restaurants/" + props._id}
							className="btn btn-primary col-lg-5 m-1">
							View Reviews
						</Link>
						<a
							target="_blank"
							rel="noreferrer"
							href={"https://www.google.com/maps/place/" + props.address}
							className="btn btn-primary col-lg-5 m-1">
							View Map
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RestaurantCard;
