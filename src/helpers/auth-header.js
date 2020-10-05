exports.authHeader = () => {
	let token = localStorage.getItem('token');
	return { Authorization: `Bearer ${token}` };
};
