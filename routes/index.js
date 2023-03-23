var express = require('express');
var router = express.Router();
var serviciosModel = require('../models/serviciosModel');
var cloudinary = require('cloudinary').v2;

/* GET home page. */
router.get('/', async function (req, res, next) {
  
  var servicios = await serviciosModel.getServicios();

  servicios = servicios.splice(0, 5); // seleccionar los primeros 5 dek array
  servicios = servicios.map(servicio => {
    if (servicio.img_id) {
      const imagen = cloudinary.url(servicio.img_id, {
        width: 460,
        crop: 'fill'
      });
      return {
        ...servicio,
        imagen
      }
    } else {
      return {
        ...servicio,
        imagen: '/images/noimage.jpg'
      }
    }
  });
  res.render('index', {
    servicios
  });
});

module.exports = router;
