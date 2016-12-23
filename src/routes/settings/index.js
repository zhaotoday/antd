module.exports = {
  path: 'settings',
  getComponents(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('app/settings'))
    })
  },
  getIndexRoute(location, callback) {
    require.ensure([], function (require) {
      callback(null, {
        component: require('app/settings/form')
      })
    })
  },
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./sliders')
      ])
    })
  }
}
