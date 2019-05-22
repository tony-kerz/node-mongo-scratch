import joi from 'joi'
import _ from 'lodash'
import {US_STATES} from '@watchmen/helpr'

const states = Object.keys(US_STATES)

export const identified = joi.object({
	_id: joi
		.string()
		.meta({isGenerated: true})
		.label('id')
})

export const dated = joi.object({date: joi.date().iso()})

export const named = joi.object({
	name: joi.object({
		first: joi.string().required(),
		last: joi.string().required()
	})
})

export const addressed = joi.object({
	address: joi.object({
		street: joi.string().required(),
		unit: joi.string(),
		city: joi.string().required(),
		state: joi
			.string()
			.required()
			.valid(states),
		zip: joi
			.string()
			.required()
			.regex(/^\d{5}(-\d{4})?$/)
	})
})

export const user = identified.concat(named).concat(joi.object({email: joi.string().email()}))

// use isForbidden() v isGenerated which will disallow incoming mods...?
export const write = dated.concat(joi.object({user})).meta({isGenerated: true})

export const audited = joi.object({
	created: write,
	updated: write
})

export function select({options}) {
	return joi
		.string()
		.valid(_.keys(options))
		.meta({options})
}

export function regex({pattern}) {
	return joi
		.string()
		.regex(pattern)
		.meta({regex: pattern.toString()})
}

export const ssn = joi
	.string()
	.regex(/^\d{3}-\d{2}-\d{4}$/)
	.meta({
		type: 'ssn',
		example: '123-45-6789'
	})

export const phone = joi
	.string()
	.regex(/^\d{3}-\d{3}-\d{4}$/)
	.meta({
		type: 'phone',
		example: '212-861-0610'
	})

export const seeded = joi.object({
	isSeed: joi.boolean()
})
