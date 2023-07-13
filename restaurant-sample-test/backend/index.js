import app from "./server.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT;
const uri = process.env.URI;

async function connect() {
	try {
		await mongoose.connect(uri, {
			maxPoolSize: 50,
			wtimeoutMS: 2500,
			useNewUrlParser: true,
		});
		app.listen(port, () => {
			console.log("Listening on port " + port);
		});
	} catch (err) {
		console.log(err.stack);
		process.exit(1);
	}
}

connect();
