module.exports = {
  path: 'jobs',
  getComponents(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('app/jobs'))
    })
  },
  getIndexRoute(location, callback) {
    require.ensure([], function (require) {
      callback(null, {
        component: require('app/jobs/list')
      })
    })
  },
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./form'),
        require('./categories')
      ])
    })
  }
}
