module.exports = {
	mongo: {
		host: 'MONGO_HOST',
		// host: '10.17.7.140,10.17.7.141,10.17.7.142',
		// replicaSet: 'rs0',
		replicaSet: 'MONGO_REPLICA_SET',
		db: 'MONGO_DB',
		poolSize: 'MONGO_POOL_SIZE'
	},
	listener: {
		port: 'LISTENER_PORT',
		auth: {
			// provide secret _or_ publicKey, if both are provided secret will take precedence!
			secret: 'LISTENER_AUTH_SECRET',
			publicKey: 'LISTENER_AUTH_PUBLIC_KEY',
			relaxCredentials: 'LISTENER_AUTH_RELAX_CREDENTIALS'
		}
	},
	seeder: {
		people: {
			count: 'SEEDER_PEOPLE_COUNT',
			thresh: 'SEEDER_PEOPLE_THRESH'
		}
	}
}
