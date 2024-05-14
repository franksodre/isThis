exports.intro = async(request, response) => {
	const locals = {
		title: "introduction"
	}
	response.render("intro", locals);
}