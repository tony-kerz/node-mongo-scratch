import express from 'express'
import {pretty} from '@watchmen/helpr'
import debug from '@watchmen/debug'
import {stringify} from '@watchmen/schema-helpr'
import people from '../data/people/schema'

const dbg = debug(__filename)
const router = express.Router()

const schema = {
	requests: people.describe()
}

dbg('schemas=%s\n', pretty(schema))

export default router.get('/', async (req, res) => {
	res.send(stringify({schema}))
})
