const fetch = require("node-fetch");
const { parse } = require("node-html-parser");

const FICBOOK_SITE = "ficbook.net";

function validate(url) {
	if (!url) err("No URL defined!");
	if (url.startsWith("https://")) {
		url = url.substr(8);
	} else if (url.startsWith("http://")) {
		url = url.substr(7);
	} else {
		err("URL has to start with 'http://' or 'https://'")
	}
	if (url.startsWith(FICBOOK_SITE + "/readfic/")) {
		let len = (FICBOOK_SITE + "/readfic/").length;
		url = url.substr(len);
		if (url.length <= 0) err("URL is not correct!");
	} else {
		err("Wrong fanfiction url");
	}
}

function err(reason) {
	throw new Error(reason);
}

async function readFic(url) {
	validate(url)
	{
		let hashIndex = url.indexOf("#");
		if (hashIndex > -1) {
			url = url.substr(0, hashIndex);
		}
	}
	const resp = await fetch(url);
	if (resp.status == 200) {
		let text = await resp.text();
		return parseHtml(text)
	} else {
		err(`Error status ${resp.status} with text: ${await resp.text()}`);
	}
}

function parseHtml(text) {
	let html = parse(text);
	let nodes = html.querySelector("#content");
	if (nodes && nodes.childNodes && nodes.childNodes.length > 0 && nodes.childNodes[0].rawText && nodes.childNodes[0].rawText.length > 0) {
		return nodes.childNodes[0].rawText;
	}
}

module.exports = {readFic};