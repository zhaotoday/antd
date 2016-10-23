import combineReducers from 'redux/lib/combineReducers'
import articles from './articles'
import files from './files'

export default combineReducers({
  articles,
  files
})
