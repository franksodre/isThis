const { request } = require("express")

const products = {
	item1: 'pirate hat',
	item2: 'pirate boot',
	item3: 'we\'re pirates ahoy! '
}

exports.Prods = async (request, response) => {
	return response.json({ products });
}