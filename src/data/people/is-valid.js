import {joiValidator} from '@watchmen/helpr/dist/joi-helper'
import schema from './schema'

const validate = joiValidator({
	schema
})

export default async function({data, mode}) {
	return validate({mode, data})
}
