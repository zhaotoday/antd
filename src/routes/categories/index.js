module.exports = {
  path: 'categories',
  getComponents(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('app/categories'))
    })
  },
  getIndexRoute(location, callback) {
    require.ensure([], function (require) {
      callback(null, {
        component: require('app/categories/list')
      })
    })
  }
}
