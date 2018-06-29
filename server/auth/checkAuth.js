const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
	try{
		const token = req.header('x-auth');
		console.log('token:' + token);
		const decodedToken = jwt.verify(token, config.secret);
		req.userData = { email: decodedToken.email, userId: decodedToken.userId};
		next();

	}catch(e){
		res.status(401).json({message: 'Auth Failed'});

	}

};


// 	try{
// 	const token = req.headers.authorization.split(' ')[1];
// 	const decodedToken = jwt.verify(token, process.env.JWT_KEY);
// 	req.userData = { email: decodedToken.email, userId: decodedToken.userId};
// 	next();
//
// }catch(e){
// 	res.status(401).json({message: 'Auth Failed'});
//
// }

