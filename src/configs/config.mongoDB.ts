type Tapp = {
	port: string;
};
type Tdb = {
	port: string;
	host: string;
	name: string;
};

type TconfigMongoDB = {
	app: Tapp;
	db: Tdb;
};

const dev: TconfigMongoDB = {
	app: {
		port: process.env.DEV_APP_PORT || '8002',
	},
	db: {
		host: process.env.DEV_DB_HOST || 'localhost',
		port: process.env.DEV_DB_PORT || '27017',
		name: process.env.DEV_DB_NAME || 'tipjs',
	},
};

const product: TconfigMongoDB = {
	app: {
		port: process.env.PRODUCT_APP_PORT || '8002',
	},
	db: {
		host: process.env.PRODUCT_DB_HOST || 'localhost',
		port: process.env.PRODUCT_DB_PORT || '27017',
		name: process.env.PRODUCT_DB_NAME || 'tipjs',
	},
};

const configs = { dev, product };
let config: TconfigMongoDB;

process.env.NODE_ENV
	? process.env.NODE_ENV === 'dev'
		? (config = configs.dev)
		: (config = configs.product)
	: (config = configs.dev);

module.exports = config;
