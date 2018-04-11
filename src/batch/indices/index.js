#!/usr/bin/env node
import getIndexer from '@watchmen/mongo-batch/dist/indexer'
import constants from '../../constants'
import people from './people'

const indexMap = {
  [constants.PEOPLE]: people
}

getIndexer({indexMap})()
