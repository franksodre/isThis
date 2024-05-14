exports.home = async(request, response) => {

}

exports.homeGet = async (request, response) => {
	const locals = {
	    title: "InsidePC"
	}
	response.render('index', locals)
}