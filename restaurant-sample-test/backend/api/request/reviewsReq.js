import { Review, ObjectId } from "./mongooseModels.js";

export default class ReviewReq {
	static async postReview(body) {
		try {
			const newReview = new Review({
				user_id: body.user_id,
				name: body.name,
				date: new Date(),
				text: body.text,
				restaurant_id: new ObjectId(body.restaurant_id),
			});
			const res = await newReview.save();
			return { status: "success" };
		} catch (err) {
			return { error: "Unable to add review" };
		}
	}

	static async updateReview(body) {
		try {
			const { review_id, user_id, text } = body;
			const res = await Review.findOneAndUpdate(
				{ user_id: user_id, _id: new ObjectId(review_id) },
				{ text: text, date: new Date() }
			);
			if (res) {
				return { status: "success" };
			} else {
				return { error: "Review not found" };
			}
		} catch (err) {
			return { error: "Unable to update review" };
		}
	}

	static async deleteReview(body, query) {
		try {
			const { user_id } = body;
			const { review_id } = query;
			const res = await Review.deleteOne({
				_id: new ObjectId(review_id),
				user_id: user_id,
			});
			return { res };
		} catch (err) {
			return { error: "Unable to delete review" };
		}
	}
}
