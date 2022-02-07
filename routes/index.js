var express = require('express');
var router = express.Router();
var userController = require('../src/controllers/user.controller');
var childController = require('../src/controllers/child.controller');
var cardController = require('../src/controllers/card.controller');

var authHelper = require('../src/utils/auth.middleware')

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', userController.createParent)

router.post('/login', userController.login)

router.post('/child', authHelper.verifyToken, childController.createChild)
router.put('/child/:childId', authHelper.verifyToken, childController.updateChild)
router.delete('/child/:childId', authHelper.verifyToken, childController.deleteChild)
router.get('/child', authHelper.verifyToken, childController.getChild)

router.post('/card/:childId', authHelper.verifyToken, cardController.createCard)
router.put('/card/:cardId', authHelper.verifyToken, cardController.updateCard)
router.delete('/card/:cardId', authHelper.verifyToken, cardController.deleteCard)
router.get('/card', authHelper.verifyToken, cardController.getCard)

router.post('/charge', authHelper.verifyToken, cardController.charge)

module.exports = router;
