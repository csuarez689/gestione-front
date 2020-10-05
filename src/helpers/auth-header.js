exports.authHeader = () => {
	let token = localStorage.getItem('token');
	return { Authorization: token };
};
