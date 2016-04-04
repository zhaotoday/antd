import actionTypes from '../constant/article';
import axios from 'axios';
import { createAction } from 'redux-actions';

export const addArticle = createAction(
  actionTypes.ADD_ARTICLE,
  (options) => {
    return axios.get('http://localhost/api.php', options)
  },
  (options) => ({
    success: {
      handler() {
        alert(3);
      }
    }
  })
);