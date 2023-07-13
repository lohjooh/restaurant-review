import { Restaurant, Review, ObjectId } from "./mongooseModels.js";

export default class RestaurantDAO {
	static async getRestaurants(query) {
		try {
			const { page = 1, limit = 20, zipcode, name, ...parsedQuery } = query;

			if (zipcode) {
				parsedQuery["address.zipcode"] = zipcode;
			}
			if (name) {
				parsedQuery["name"] = { $regex: name, $options: "i" };
			}

			const result = await Restaurant.find(parsedQuery)
				.limit(parseInt(limit))
				.skip(parseInt(limit) * parseInt(page - 1))
				.exec();

			const totalResults = await Restaurant.count(parsedQuery);

			return {
				restaurants: result,
				totalRestaurantsFound: totalResults,
				page: page,
				resultsPerPage: limit,
			};
		} catch (err) {
			return { error: err };
		}
	}

	static async getRestaurantsById(id) {
		try {
			const restaurant = await Restaurant.findById(id);
			const reviews = await Review.find({ restaurant_id: new ObjectId(id) });
			return { restaurant, reviews: reviews };
		} catch (err) {
			return { error: err };
		}
	}

	static async getRestaurantCuisines() {
		try {
			return await Restaurant.distinct("cuisine");
		} catch (err) {
			return { error: err };
		}
	}
}
