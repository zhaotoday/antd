import actionTypes from '../consts/jobs'
import Model from '../models/jobs'
import createAction from 'redux-actions/lib/createAction'

/**
 * 获取岗位详情
 */
export const getJob = createAction(
  actionTypes.GET_JOB,
  (options = {}) => {
    return new Model()
      .addPath('{job_id}')
      .replace({
        'job_id': options['job_id']
      })
      .GET()
  }
)

/**
 * 获取岗位列表
 */
export const getJobs = createAction(
  actionTypes.GET_JOBS,
  (options = {}) => {
    return new Model().GET({
      params: options.params
    })
  }
)

/**
 * 新增岗位
 */
export const postJob = createAction(
  actionTypes.POST_JOB,
  (options = {}) => {
    return new Model()
      .POST({
        data: options.data
      })
  }
)

/**
 * 编辑岗位
 */
export const putJob = createAction(
  actionTypes.PUT_JOB,
  (options = {}) => {
    return new Model()
      .addPath('{job_id}')
      .replace({
        'job_id': options['job_id']
      })
      .PUT({
        data: options.data
      })
  }
)

/**
 * 删除岗位
 */
export const deleteJob = createAction(
  actionTypes.DELETE_JOB,
  (options = {}) => {
    return new Model()
      .DELETE({
        params: options.params
      })
  }
)
