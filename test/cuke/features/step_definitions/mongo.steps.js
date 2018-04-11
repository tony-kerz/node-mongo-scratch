import mongoSteps from '@watchmen/mongo-cuke-helpr'
import {constants} from '@watchmen/mongo-data'
import _constants from '../../../../src/constants'

export default mongoSteps({constants: {..._constants, ...constants}})
