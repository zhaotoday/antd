import combineReducers from 'redux/lib/combineReducers'
import articles from './articles'
import article from './article'
import files from './files'
import file from './file'
import categories from './categories'
import category from './category'
import setting from './setting'

export default combineReducers({
  articles,
  article,
  files,
  file,
  categories,
  category,
  setting
})
