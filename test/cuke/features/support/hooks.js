import {defineSupportCode} from 'cucumber'
import debug from '@watchmen/debug'
import {initState} from '@watchmen/test-helpr'
import {getDb} from '@watchmen/mongo-helpr'
import {initDb} from '@watchmen/mongo-test-helpr'

const dbg = debug(__filename)
dbg('loaded hooks')

// eslint-disable-next-line no-unused-expressions
require('../../../../src').default

defineSupportCode(function({setDefaultTimeout}) {
  setDefaultTimeout(15 * 1000)
})

defineSupportCode(function({Before}) {
  Before(async function(testCase) {
    try {
      dbg('before: feature=%o, scenario=%o', testCase.sourceLocation.uri, testCase.pickle.name)
      initState()
      const db = await getDb()
      const result = await initDb(db)
      dbg('before: init-db result=%o', result)
    } catch (error) {
      dbg('before: caught=%o', error)
      throw error
    }
  })
})
