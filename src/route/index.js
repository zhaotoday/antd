const rootRoute = {
  component: 'div',
  childRoutes: [{
    path: '/',
    component: require('app'),
    getIndexRoute(location, callback) {
      require.ensure([], function (require) {
        callback(null, {
          component: require('app/dashboard')
        })
      })
    },
    getChildRoutes(location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          require('./article')
        ])
      })
    }
  }]
};

export default rootRoute;