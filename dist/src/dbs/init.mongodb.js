'use strict';
var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function (resolve) {
						resolve(value);
				  });
		}
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator['throw'](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose = require('mongoose');
const urlDB = 'mongodb://127.0.0.1:27017/tipjs';
// singleton for once connect
class Database {
	constructor() {
		this.connect();
	}
	// connect
	connect(type = 'mongodb') {
		return __awaiter(this, void 0, void 0, function* () {
			// check development environment
			if (1 === 1) {
				mongoose.set('debug', true);
				mongoose.set('debug', {
					color: true,
				});
			}
			yield mongoose
				.connect(urlDB, {
					maxPoolSize: 50, // default: 100, số kết nối tối đa mà một pool có thể giữ
				})
				.then(() => console.log('Connected Database Successfully!'))
				.catch((err) => {
					console.log('Error Connect!: ', err);
				});
		});
	}
	static getInstance() {
		return __awaiter(this, void 0, void 0, function* () {
			if (!this._instance) {
				this._instance = yield new Database();
			}
			return this._instance;
		});
	}
}
const instanceDB = Database.getInstance();
module.exports = instanceDB;
