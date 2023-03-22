var express = require('express');
var router = express.Router();
var serviciosModel = require('../models/serviciosModel');

/* GET home page. */
router.get('/', async function (req, res, next) {
  
  var servicios = await serviciosModel.getServicios();
  res.render('index', {
    servicios
  });
});

module.exports = router;
