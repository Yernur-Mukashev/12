const express = require("express");
const fs = require("fs");

const app = express();

const countersFilePath = "./counters.json";

const loadCounters = () => {
	const data = fs.readFileSync(countersFilePath, "utf8");
	return JSON.parse(data);
};

const saveCounters = (counters) => {
	fs.writeFileSync(countersFilePath, JSON.stringify(counters, null, 2));
};

let counters = loadCounters();

app.get("/", (req, res) => {
	counters["/"] += 1;
	saveCounters(counters);
	res.send(`<h1>Добро пожаловать на мой сайт!</h1>
        <a href="/about">Перейти на страницу обо мне!</a>
        <p>Просмотров: ${counters["/"]}</p>`);
});

app.get("/about", (req, res) => {
	counters["/about"] += 1;
	saveCounters(counters);
	res.send(`<h1>Страница обо мне!</h1>
        <a href="/">Перейти на главную страницу!</a>
        <p>Просмотров: ${counters["/about"]}</p>`);
});

const port = 3000;

app.listen(port, () => {
	console.log(`Сервер запущен на порту ${port}`);
});
