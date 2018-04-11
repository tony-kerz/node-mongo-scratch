import express from 'express'
import _ from 'lodash'
import debug from '@watchmen/debug'
import {getDb} from '@watchmen/mongo-helpr'
/* eslint-disable import/extensions */
import {version} from '../../package.json'
import {sha} from '../../git.json'

const dbg = debug(__filename)
const router = express.Router()

export default router.get('/', async (req, res, next) => {
  try {
    const db = await getDb()
    const buildInfo = await db.command({buildInfo: 1})
    const response = {
      version,
      sha,
      db: {
        name: db.databaseName,
        version: _.get(buildInfo, 'version'),
        clientVersion: _.get(db, 'serverConfig.clientInfo.driver.version')
      }
    }
    res.status((response.status = 200))
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate')
    res.header('Pragma', 'no-cache')
    res.header('Expires', 0)
    res.send(response)
    dbg('response=%o', response)
  } catch (err) {
    next(err)
  }
})
