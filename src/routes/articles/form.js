module.exports = {
  path: 'form(/:article_id)',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('app/articles/form'))
    })
  }
}
