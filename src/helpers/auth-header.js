exports.authHeader = () => {
	let token = localStorage.getItem('token');
	return token ? { Authorization: `Bearer ${token}` } : null;
};
