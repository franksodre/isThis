/*
	redirect user to a especific path.
*/

const redirect = (state, path) => {
	if(state !== true){
		return window.location = `\\`;
	}
	return window.location = `${(path)}`;
}