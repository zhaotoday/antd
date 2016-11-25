import combineReducers from 'redux/lib/combineReducers'
import articles from './articles'
import file from './file'
import files from './files'

export default combineReducers({
  articles,
  file,
  files
})
