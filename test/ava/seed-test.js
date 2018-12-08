import test from 'ava'
import faker from 'faker'
import _ from 'lodash'
import RandExp from 'randexp'
import {getData} from '@watchmen/mongo-data'
import debug from '@watchmen/debug'
import peopleMeta from '../../src/data/people'

const dbg = debug(__filename)

const peopleData = getData(peopleMeta)

const idRe = new RandExp(/[AN]\d{6}/)
const ssnRe = new RandExp(/\d{3}-\d{2}-\d{4}/)
const phoneRe = new RandExp(/\d{3}-\d{3}-\d{4}/)
const zipRe = new RandExp(/\d{5}/)

const numSeed = 100

test('seed', async t => {
  for (let i = 0; i < numSeed; i++) {
    const context = {
      user: {groups: ['group-1']},
      standardUser: getStandardUser(),
      isSeed: true
    }
    const data = {
      _id: idRe.gen(),
      name: {
        first: faker.name.firstName(),
        last: faker.name.lastName()
      },
      dob: faker.date.past(),
      gender: _.sample(['M', 'F']),
      ssn: ssnRe.gen(),
      phone: phoneRe.gen(),
      address: {
        street: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.stateAbbr(),
        zip: zipRe.gen()
      }
    }
    const element = await peopleData.create({data, context})
    element.result.ok || dbg('element=%o', element)
    t.truthy(element.result.ok)
  }
})

function getStandardUser() {
  const _id = idRe.gen()
  const first = faker.name.firstName()
  const last = faker.name.lastName()
  const email = `${first}.${last}@aetna.com`
  return {_id, name: {first, last}, email}
}
