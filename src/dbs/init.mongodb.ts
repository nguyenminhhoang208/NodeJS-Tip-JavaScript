'use strict';

import { Mongoose } from 'mongoose';

const mongoose: Mongoose = require('mongoose');

const { countConnect } = require('../helpers/check.connect');
const urlDB = 'mongodb://127.0.0.1:27017/tipjs';

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
			this._instance = await new Database();
		}
		return this._instance;
	}
}
const instanceDB = Database.getInstance();
module.exports = instanceDB;
