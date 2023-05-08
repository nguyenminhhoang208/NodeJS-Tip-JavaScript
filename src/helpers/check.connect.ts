'use strict';
const mongoose = require('mongoose');
const os = require('os'); // cung cap cac tien ich lien quan den he dieu hanh
const process = require('process');
const _SECCONDS = 5000;

// check count connect
const countConnect: object = (): number => {
	const sumConnects: number = mongoose.connections.length; // get the number of connections
	console.log('Number of connection: ' + sumConnects);
	return sumConnects;
};

// check overload
const checkOverload: object = (): void => {
	setInterval((): void => {
		// get the number of connections
		const numConnection = mongoose.connections.length;
		// os.cpus() Trả về mảng đối tượng chứa thông tin về CPU/core: model, speed (giá trị MHz), và thời gian.
		const numCores = os.cpus().length;
		const memoryUsage = process.memoryUsage().rss;
		// Example maximum number of connections based on number of cores
		const maxConnections = 5 * numCores;
		console.log('Active connections: ' + numConnection);
		console.log('Memory usage: ' + memoryUsage / (1024 * 1024) + ' MB');
		if (numConnection > maxConnections) {
			console.log('Connection overload detected!');
			// notify.send(...)
		}
	}, _SECCONDS);
};

export {};

module.exports = {
	countConnect,
	checkOverload,
};
