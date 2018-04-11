#!/usr/bin/env node
//import getSeeder from '@watchmen/mongo-batch/dist/seeder'
import seeder from './seeder'
import people from './people'

export default seeder({seeders: [people]})
