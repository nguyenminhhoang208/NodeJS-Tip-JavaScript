"use strict";
const app = require('./src/app');
const PORT = 8002;
const server = app.listen(PORT, () => {
    console.log('Web server run at: http://localhost:' + PORT);
});
