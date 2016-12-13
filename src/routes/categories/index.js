module.exports = {
  path: 'articles',
  getComponents(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('app/articles'))
    })
  },
  getIndexRoute(location, callback) {
    require.ensure([], function (require) {
      callback(null, {
        component: require('app/articles/list')
      })
    })
  },
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./form')
      ])
    })
  }
}
