import * as articleActions from './articles'
import * as fileActions from './files'
import * as categoryActions from './categories'
import * as jobActions from './jobs'
import * as commodityActions from './commodities'
import * as settingActions from './settings'
import * as sliderActions from './sliders'
import * as actionLoginActions from './actions/login'

export default {
  ...articleActions,
  ...fileActions,
  ...categoryActions,
  ...jobActions,
  ...commodityActions,
  ...settingActions,
  ...sliderActions,
  ...actionLoginActions
}
