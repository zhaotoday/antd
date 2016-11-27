import combineReducers from 'redux/lib/combineReducers'
import articles from './articles'
import file from './file'
import files from './files'
import categories from './categories'

export default combineReducers({
  articles,
  file,
  files,
  categories
})
