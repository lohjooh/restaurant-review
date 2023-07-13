import http from "../http-common.js";

export default class RestaurantDataService {
	static async getAll(page = 1) {
		return http.get("?page=" + page);
	}

	static async get(id) {
		return http.get("/id/" + id);
	}

	static async find(query, by = "name", page = 1) {
		return http.get("?" + by + "=" + query + "&page=" + page);
	}

	static async createReview(data) {
		return http.post("/review", data);
	}

	static async updateReview(data) {
		return http.put("/review", data);
	}

	static async deleteReview(id, user) {
		return http.delete("/review?review_id=" + id, { data: { user_id: user } });
	}

	static async getCuisines() {
		return http.get("/cuisines");
	}
}
