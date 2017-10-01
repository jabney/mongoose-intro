var express = require('express');
var router = express.Router();
var standupCtrl = require('../controllers/standup.controller')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Standup' });
// })

router
  .get('/', standupCtrl.list)
  .post('/', standupCtrl.filterByMember)

router.get('/newnote', standupCtrl.getNote)

router.post('/newnote', standupCtrl.create)

module.exports = router;
