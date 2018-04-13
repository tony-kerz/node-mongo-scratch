#!/usr/bin/env node
import {getSeeder} from '@watchmen/mongo-batch'
import people from './people'

export default getSeeder({seeders: [people]})
