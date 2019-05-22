import joi from 'joi'
import {identified, named, addressed, phone, ssn, audited, seeded} from '../validators'

export default identified
	.concat(named.required())
	.concat(addressed.required())
	.concat(
		joi.object({
			phone: phone.required(),
			ssn: ssn.required(),
			dob: joi
				.date()
				.iso()
				.required(),
			gender: joi.string().valid(['M', 'F']),
			email: joi.string().email()
		})
	)
	.concat(audited)
	.concat(seeded)
