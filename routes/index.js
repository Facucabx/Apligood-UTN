var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var serviciosModel = require('../models/serviciosModel');
var cloudinary = require('cloudinary').v2;

/* GET home page. */
router.get('/', async function (req, res, next) {
  
  var servicios = await serviciosModel.getServicios();

  servicios = servicios.splice(0, 8); // seleccionar los primeros 5 dek array
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


router.post('/', async (req, res, next) => {

  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var tel = req.body.tel;
  var mensaje = req.body.mensaje;

  var obj = {
    to: 'facu.zero@gmail.com',
    subject: 'Contacto desde la web',
    html: nombre + "se contacto a través de la web y quiere más información a este correo:" + email + ". <br> Además, hizo este comentario:" + mensaje + ". <br> Su telefono es:" + tel
  }

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  var info = await transport.sendMail(obj);

  res.render('index', {
    message: 'Mensaje enviado correctamente',
  });
});

module.exports = router;
