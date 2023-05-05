const app = require('./src/app');
const PORT: number = 8002;
const server = app.listen(PORT, () => {
	console.log('Web server run at: http://localhost:' + PORT);
});
