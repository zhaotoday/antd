module.exports = {
  path: 'form(/:category_id)',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('app/categories/form'))
    })
  }
}
