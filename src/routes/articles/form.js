module.exports = {
  path: 'form',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('app/articles/form'))
    })
  }
}
