const Standup = require('../models/standup.model')

exports.list = function (req, res) {
  Standup.find()
    .sort({createdOn: 'desc'})
    .limit(12)
    .exec().then((results) => {
      res.render('index', {
        title: 'Standup - List',
        notes: results
      })
    })
}

exports.filterByMember = function (req, res) {
  const query = Standup.find()
  const filter = req.body.memberName

  query.sort({ createdOn: 'desc' })

  if (filter.length > 0) {
    query.where({ memberName: filter })
  }

  query.exec().then((results) => {
    res.render('index', {
      title: 'Standup - List: ' + filter,
      notes: results
    })
  })
}

exports.create = function (req, res) {
  const entry = new Standup({
    memberName: req.body.memberName,
    project: req.body.project,
    workYesterday: req.body.workYesterday,
    workToday: req.body.workToday,
    impediment: req.body.impediment,
  })

  // This is how we might validate after model creation.
  // entry.schema.path('memberName').validate(function (value) {
  //   // return value !== 'None'
  //   return true
  // }, 'You must select a team member name')

  entry.save()
    .then(() => {
      res.redirect(301, '/')
    })
    .catch((err) => {
      const message = Object.keys(err.errors).map((key) => {
        return err.errors[key]
      }).join(', ')

      res.render('newnote', {
        title: 'Standup - New Note (error)',
        message: message
      })
    })
  // res.redirect(301, '/')
}

exports.getNote = function (req, res) {
  res.render('newnote', { title: 'Standup - New Note' })
}
