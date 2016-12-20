module.exports = {
  path: 'commodities',
  getComponents(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('app/commodities'))
    })
  },
  getIndexRoute(location, callback) {
    require.ensure([], function (require) {
      callback(null, {
        component: require('app/commodities/list')
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
