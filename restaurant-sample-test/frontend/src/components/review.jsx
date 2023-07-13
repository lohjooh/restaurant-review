import { useState } from "react";
import RestaurantDS from "./services/restaurant";
import { useLocation, useParams, Link } from "react-router-dom";

function Review(props) {
	const { id } = useParams();

	let initialText = "";
	let isEditing = false;
	let { state } = useLocation();

	if (state && state.currentReview) {
		isEditing = true;
		initialText = state.currentReview.text;
	}

	const [review, setReview] = useState(initialText);
	const [isSubmitted, setSubmitted] = useState(false);

	function handleChange(event) {
		setReview(event.target.value);
	}

	async function saveReview() {
		const data = {
			text: review,
			name: props.user.name,
			user_id: props.user.id,
			restaurant_id: id,
		};

		try {
			if (isEditing) {
				data.review_id = state.currentReview._id;
				await RestaurantDS.updateReview(data);
				setSubmitted(true);
			} else {
				await RestaurantDS.createReview(data);
				setSubmitted(true);
			}
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<div>
			{props.user ? (
				<div className="submit-form">
					{isSubmitted ? (
						<div>
							<h4>You submitted successfully!</h4>
							<Link to={"/restaurants/" + id} className="btn btn-success">
								Back to Restaurant
							</Link>
						</div>
					) : (
						<div>
							<div className="form-group">
								<label htmlFor="description">
									{isEditing ? "Edit" : "Create"} Review
								</label>
								<input
									type="text"
									className="form-control"
									id="text"
									required
									value={review}
									onChange={handleChange}
									name="text"
								/>
							</div>
							<button onClick={saveReview} className="btn btn-success">
								Submit
							</button>
						</div>
					)}
				</div>
			) : (
				<div>Please log in.</div>
			)}
		</div>
	);
}

export default Review;
