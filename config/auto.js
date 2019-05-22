module.exports = {
	mongo: {
		db: 'people-auto',
		poolSize: 5
	},
	listener: {
		auth: {
			secret: 's3cret',
			relaxCredentials: true
		}
	}
}
