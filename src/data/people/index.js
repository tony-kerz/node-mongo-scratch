import {
  createdDataHook,
  changesPostUpdateHook as postUpdateHook,
  postDeleteHook
} from '@watchmen/mongo-data'
import {oid} from '@watchmen/mongo-helpr'
import constants from '../../constants'
import isValid from './is-valid'

export default {
  collectionName: constants.PEOPLE,
  dataHook: [createdDataHook],
  isValid,
  postUpdateHook,
  postDeleteHook,
  xforms: {
    _id: ({value}) => {
      return {_id: oid({value})}
    }
  }
}
