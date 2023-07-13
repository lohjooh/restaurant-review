import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

const RestaurantSchema = new mongoose.Schema({}, { strict: false });
const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

const ReviewSchema = new mongoose.Schema({
	user_id: {
		type: String,
		required: true,
	},
	name: String,
	date: Date,
	text: String,
	restaurant_id: ObjectId,
});

const Review = mongoose.model("Review", ReviewSchema);

export { Restaurant, Review, ObjectId };