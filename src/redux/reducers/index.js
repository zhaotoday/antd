import combineReducers from 'redux/lib/combineReducers'
import article from './article'
import articles from './articles'
import file from './file'
import files from './files'
import categories from './categories'

export default combineReducers({
  article,
  articles,
  file,
  files,
  categories
})
