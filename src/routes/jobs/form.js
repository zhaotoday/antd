module.exports = {
  path: 'form(/:job_id)',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('app/jobs/form'))
    })
  }
}
