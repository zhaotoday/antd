module.exports = {
  path: 'sliders',
  getComponents(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('app/sliders'))
    })
  },
  getIndexRoute(location, callback) {
    require.ensure([], function (require) {
      callback(null, {
        component: require('app/sliders/list')
      })
    })
  }
}
