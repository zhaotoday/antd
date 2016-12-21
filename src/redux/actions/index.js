import * as articleActions from './articles'
import * as fileActions from './files'
import * as categoryActions from './categories'
import * as settingActions from './settings'
import * as actionLoginActions from './actions/login'

export default {
  ...articleActions,
  ...fileActions,
  ...categoryActions,
  ...settingActions,
  ...actionLoginActions
}
