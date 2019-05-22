import test from 'ava'
import joi from 'joi'
import people from '../../src/data/people/schema'
import {check} from './_helper'

test('person: success', t => {
	const result = joi.validate(
		{
			name: {first: 'fred', last: 'smith'},
			address: {
				street: '1 main',
				unit: 'apt 1',
				city: 'whoville',
				state: 'CT',
				zip: '02020'
			},
			gender: 'M',
			dob: '',
			email: 'a@b.co',
			phone: '212-222-2222',
			ssn: '123-34-2223'
		},
		people
	)
	check({result})
	t.truthy(result.value)
})

test('person: fail', t => {
	const result = joi.validate(
		{
			name: {first: 'fred', last: 'smith'},
			address: {
				street: '1 main',
				unit: 'apt 1',
				city: 'whoville',
				state: 'CT',
				zip: '02020'
			},
			gender: 'M',
			dob: '',
			email: 'a@b.co',
			phone: '212-222-2222',
			ssn: '123-34-2223'
		},
		people
	)
	check({result})
	t.truthy(result.value)
})
