import { useState, useEffect } from "react";
import RestaurantDS from "./services/restaurant.js";
import { Link, useParams } from "react-router-dom";

function Restaurants(props) {
	const initialRestaurant = {
		id: "null",
		name: "",
		address: {},
		cuisine: "",
		reviews: [],
	};

	const [restaurant, setRestaurant] = useState(initialRestaurant);
	const { id } = useParams();

	useEffect(() => {
		getRestaurant(id);
	}, [id]);

	async function getRestaurant(restaurantId) {
		try {
			const res = await RestaurantDS.get(restaurantId);
			setRestaurant({ ...res.data.restaurant, reviews: res.data.reviews });
		} catch (err) {
			console.error(err);
		}
	}

	async function deleteReview(reviewId, index) {
		try {
			const res = await RestaurantDS.deleteReview(reviewId, props.user.id);

			setRestaurant((prev) => {
				prev.reviews.splice(index, 1);
				return { ...prev };
			});
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<div>
			{restaurant ? (
				<div>
					<h5>{restaurant.name}</h5>
					<p>
						<strong>Cuisine: </strong>
						{restaurant.cuisine}
						<br />
						<strong>Address: </strong>
						{restaurant.address.building} {restaurant.address.street},{" "}
						{restaurant.address.zipcode}
					</p>
					<Link
						to={"/restaurants/" + id + "/review"}
						className="btn btn-primary">
						Add Review
					</Link>
					<h4> Reviews </h4>
					<div className="row">
						{restaurant.reviews.length > 0 ? (
							restaurant.reviews.map((review, index) => {
								return (
									<div className="col-lg-4 pb-1" key={index}>
										<div className="card">
											<div className="card-body">
												<p className="card-text">
													{review.text}
													<br />
													<strong>User: </strong>
													{review.name}
													<br />
													<strong>Date: </strong>
													{review.date}
												</p>
												{props.user && props.user.id === review.user_id && (
													<div className="row">
														<button
															onClick={() => deleteReview(review._id, index)}
															className="btn btn-primary col-lg-5 mx-1 mb-1">
															Delete
														</button>
														<Link
															to={"/restaurants/" + id + "/review"}
															state={{ currentReview: review }}
															className="btn btn-primary col-lg-5 mx-1 mb-1">
															Edit
														</Link>
													</div>
												)}
											</div>
										</div>
									</div>
								);
							})
						) : (
							<div className="col-sm-4">
								<p>No reviews yet.</p>
							</div>
						)}
					</div>
				</div>
			) : (
				<div>
					<br />
					<p>No restaurant selected.</p>
				</div>
			)}
		</div>
	);
}

export default Restaurants;
