// eslint-disable-next-line import/no-unassigned-import
import 'babel-polyfill'
import config from 'config'
import _ from 'lodash'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import jwt from 'express-jwt'
import yn from 'yn'
import {webHelpr} from '@watchmen/web-helpr'
import {errorHandler, getStandardUser} from '@watchmen/mongo-rest'
import debug from '@watchmen/debug'
import {assert} from '@watchmen/helpr'
import healthzRouter from './routers/healthz'
import peopleRouter from './routers/people'
import schemaRouter from './routers/schemas'

const dbg = debug(__filename)

const app = express()

let secretOrPublicKey = _.get(config, 'listener.auth.secret')
if (!secretOrPublicKey) {
  const key = _.get(config, 'listener.auth.publicKey')
  assert(key, 'secret or public-key required')
  secretOrPublicKey = webHelpr.formatPublicKey({key})
}
// dbg('secret-or-public-key=%o', secretOrPublicKey)

const credentialsRequired = !yn(_.get(config, 'listener.auth.relaxCredentials'))
const whitelist = _.get(config, 'listener.auth.whitelist')

credentialsRequired || dbg('WARNING: configured without strictly requiring credentials')

process.on('unhandledRejection', err => {
  dbg('unhandled-rejection: %o', err)
  process.exit(1)
})

export default (async function() {
  // keep jwt filter early!
  app.use((req, res, next) => {
    dbg('auth=%o, secret=%o', req.get('authorization'), secretOrPublicKey)
    next()
  })
  app.use(
    jwt({secret: secretOrPublicKey, credentialsRequired}).unless({path: whitelist}),
    (req, res, next) => {
      const {user} = req
      if (user) {
        req.standardUser = getStandardUser({user})
      }
      next()
    }
  )
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(cors({exposedHeaders: 'x-total-count'}))
  app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', 'default-src "none"; connect-src "self" https:;')
    next()
  })

  app.get('/', (req, res) => {
    dbg('req.user=%o', req.user)
    res.send('api home...')
  })

  app.use('/healthz', healthzRouter)
  app.use('/people', peopleRouter)
  app.use('/schemas', schemaRouter)

  app.use(errorHandler)

  const port = config.get('listener.port')
  app.listen(port, () => {
    dbg('listening on port=%o', port)
  })
})()
