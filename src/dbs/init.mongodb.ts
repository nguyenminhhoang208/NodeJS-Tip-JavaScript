'use strict';

import { Mongoose } from 'mongoose';

const mongoose: Mongoose = require('mongoose');
const config = require('../configs/config.mongoDB');

const { countConnect } = require('../helpers/check.connect');

const urlDB = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;
console.log(urlDB);

// singleton for once connect
class Database {
	private static _instance: Database;
	private constructor() {
		this.connect();
	}

	// connect
	async connect(type: string = 'mongodb'): Promise<void> {
		// check development environment
		if (1 === 1) {
			mongoose.set('debug', true);
			mongoose.set('debug', {
				color: true,
			});
		}
		await mongoose
			.connect(urlDB)
			.then(() => {
				countConnect();
				console.log('Connected Database Successfully!');
			})
			.catch((err: Error) => {
				console.log('Error Connect!: ', err);
			});
	}
	static async getInstance() {
		if (!this._instance) {
			await (() => {
				if (!this._instance) {
					this._instance = new Database();
				}
			})();
		}
		return this._instance;
	}
}
const instanceDB = Database.getInstance();

module.exports = instanceDB;
