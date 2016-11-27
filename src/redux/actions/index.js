import * as articleActions from './articles'
import * as fileActions from './files'
import * as categoryActions from './categories'

export default {
  ...articleActions,
  ...fileActions,
  ...categoryActions
}
