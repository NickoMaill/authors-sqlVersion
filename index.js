const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({
	path: "./config.env",
});
const { Pool } = require("pg");

app.use(express.json());

const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

app.get("/authors", async (_req, res) => {
	let authors;
	try {
		authors = await Postgres.query("SELECT * FROM authors");
	} catch (err) {
		console.error(err);
		return res.status(400).json({
			message: "an error happened",
		});
	}

	res.json(authors.rows);
});

app.get("/authors/:id", async (req, res) => {
	let authors;
	try {
		authors = await Postgres.query("SELECT * FROM authors WHERE authors.author_id=$1", [req.params.id]);
	} catch (err) {
		console.error(err);
		return res.status(400).json({
			message: "an error happened",
		});
	}
	res.json(authors.rows);
});

app.get("/authors/:id/books/", async (req, res) => {
	let authors;
	try {
		authors = await Postgres.query("SELECT books FROM authors WHERE authors.author_id=$1", [req.params.id]);
	} catch (err) {
		console.error(err);
		return res.status(400).json({
			message: "an error happened",
		});
	}
	res.json(authors.rows);
});

app.get("*", (_req, res) => {
	res.status(404).send("Page not found");
});

app.listen(8000, () => {
	console.log("Listening on port 8000");
});
