import express from "express";
import RestaurantReq from "./request/restaurantReq.js";
import ReviewReq from "./request/reviewsReq.js";

const router = express.Router();

router.route("/").get(async (req, res) => {
	const result = await RestaurantReq.getRestaurants(req.query);
	res.json(result);
});

router.route("/id/:id").get(async (req, res) => {
	const result = await RestaurantReq.getRestaurantsById(req.params.id);
	res.json(result);
});

router.route("/cuisines").get(async (req, res) => {
	const result = await RestaurantReq.getRestaurantCuisines();
	res.json(result);
});

router
	.route("/review")
	.post(async (req, res) => {
		const result = await ReviewReq.postReview(req.body);
		res.json(result);
	})
	.put(async (req, res) => {
		const result = await ReviewReq.updateReview(req.body);
		res.json(result);
	})
	.delete(async (req, res) => {
		const result = await ReviewReq.deleteReview(req.body, req.query);
		res.json(result);
	});

export default router;
