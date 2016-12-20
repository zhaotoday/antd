module.exports = {
  path: 'form(/:commodity_id)',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('app/commodities/form'))
    })
  }
}
