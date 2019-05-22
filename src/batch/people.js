import {getIngester} from '@watchmen/mongo-batch'
import constants from '../constants'

export default getIngester({
	inputName: constants.PEOPLE_RAW,
	outputName: constants.PEOPLE,
	steps: [
		{
			$sort: {_id: 1}
		}
	],
	isReplace: true
})()
