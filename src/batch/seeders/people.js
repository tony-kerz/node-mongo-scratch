import _ from 'lodash'
import faker from 'faker'
import RandExp from 'randexp'
import debug from '@watchmen/debug'
import meta from '../../data/people'

const dbg = debug(__filename)

const ssnRe = new RandExp(/\d{3}-\d{2}-\d{4}/)
const phoneRe = new RandExp(/\d{3}-\d{3}-\d{4}/)
const zipRe = new RandExp(/\d{5}/)
const idRe = new RandExp(/[AN]\d{6}/)

const context = {
  date: new Date()
}

export default {
  meta,
  generate: ({index}) => {
    dbg('generate: index=%o', index)
    const user = getUser()
    context.standardUser = _.omit(user, 'name')
    const {first, last} = user.name
    const data = {
      name: {
        first,
        last
      },
      dob: faker.date.past(),
      gender: _.sample(['M', 'F']),
      ssn: ssnRe.gen(),
      phone: phoneRe.gen(),
      address: {
        street: faker.address.streetAddress(),
        unit: faker.address.secondaryAddress(),
        city: faker.address.city(),
        state: faker.address.stateAbbr(),
        zip: zipRe.gen()
      },
      email: user.email
    }
    return {data, context}
  }
}

function getUser() {
  const _id = idRe.gen()
  const first = faker.name.firstName()
  const last = faker.name.lastName()
  const email = `${normalize(first)}.${normalize(last)}@acme.com`
  return {_id, name: {first, last}, email}
}

function normalize(s) {
  return _.toLower(s.split(' ').join(''))
}
