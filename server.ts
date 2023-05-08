const app = require('./src/app');

const server = app.listen(process.env.PORT, () => {
	console.log('Web server run at: http://localhost:' + process.env.PORT);
});
