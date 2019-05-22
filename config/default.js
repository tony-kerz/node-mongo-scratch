module.exports = {
	mongo: {
		host: 'localhost',
		// host: '10.17.7.140,10.17.7.141,10.17.7.142',
		// replicaSet: 'rs0',
		db: 'people',
		connectTimeoutMs: 30000,
		socketTimeoutMs: 30000,
		cursorTimeoutMs: 30000,
		poolSize: 25
	},
	listener: {
		port: 3000,
		auth: {
			// provide secret _or_ publicKey, if both are provided secret will take precedence!
			// secret: 's3cret',
			publicKey:
				'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAooW9yNSassUtStnCGykFCFTcbTpRw7G3qufzHAWe2qJDzvFx0Zfig30+XRIOsK5zU9/PJ1mirqPfuGgCnpRkL1oEW8LEnLS3bxOZL8+1k3PswNs4xVA59/f4tlOxCNZrpL35Q3CthYoEX4dOriFtPTM56uzVb2vMVj1VBYXsf5pttRWerwfVt5nZMEjunukfiN7xG7Hka+iPbZjYvUb9EAi6Pjfj3pL1GJfK40Ovj00eFkBRy/ZLaAuat2KPLKOwwXyPNkbQPax1DDSBK+ufgj47H+SXLvj/oiPyQlJWR2c2SjPmNhkHPdEkyZycPFyT117kC7ox8DgURtNIp957yQIDAQAB',
			whitelist: ['/', '/healthz', '/schemas']
		}
	},
	seeder: {
		people: {
			count: 10,
			thresh: 5
		}
	}
}
