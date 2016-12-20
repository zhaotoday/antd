import * as articleActions from './articles'
import * as fileActions from './files'
import * as categoryActions from './categories'
import * as settingActions from './settings'

export default {
  ...articleActions,
  ...fileActions,
  ...categoryActions,
  ...settingActions
}
