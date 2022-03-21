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
			massage: "an error happened",
		});
	}

	res.json(authors.rows);
});

app.get("/authors/:id", (req, res) => {
	let authors;

});

// app.get("/authors/:id/books/", (req, res) => {
// 	const author = authors[parseInt(req.params.id)];

// 	if (authors.indexOf(author).toString() === req.params.id) {
// 		return res.json(author.books);
// 	} else {
// 		return res.send("This author does not exist");
// 	}
// });

app.get("*", (_req, res) => {
	res.status(404).send("Page not found");
});

app.listen(8000, () => {
	console.log("Listening on port 8000");
});
