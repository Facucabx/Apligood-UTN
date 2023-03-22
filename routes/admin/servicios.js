var express = require('express');
var router = express.Router();

var serviciosModel = require('../../models/serviciosModel');



//GET servicios page//
router.get('/', async function (req, res, next) {

    var servicios = await serviciosModel.getServicios();
   
    res.render('admin/servicios', {
        layout: 'admin/layout',
        persona: req.session.nombre,
        servicios
    });
});

//para eliminar una novedad//
router.get('/eliminar/:id', async (req, res, next) => {
   
    const id = req.params.id;//2
   
    await serviciosModel.deleteServiciosById(id);
    res.redirect('/admin/servicios')

})//cierra get eliminar

//diseño del sitio agregar
router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar', {
        layout: 'admin/layout'
    })//cierra render
})//cierra get


//insertar la novedad en la BD//
router.post('/agregar', async (req, res, next) => {
    try {
        if (req.body.usuarios != "" && req.body.cargo != "" && req.body.info != "") {
            await serviciosModel.insertServicio(req.body);
            res.redirect('/admin/servicios')
        } else {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            })
        }
    } catch (error) {
        console.log(error)
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true,
            message:'No se cargo el profesional'
        })
    }
})


//diseño de modificar mas traer servicio que seleccione//

router.get('/modificar/:id', async (req, res, next) => {
    var id = req.params.id;
    var servicio = await serviciosModel.getServiciosById(id);
    res.render('admin/modificar', {
        layout: 'admin/layout',
        servicio
    });
}); //cierro get modi//


//ACTUALIZAR LA NOVEDAD//
router.post('/modificar', async (req, res, next) => {
    try {
      // console.log(req.body.id); para ver el id
      var obj = {
        usuarios: req.body.usuarios,
        cargo: req.body.cargo,
        info: req.body.info,
      }
  
      console.log(obj)//para ver los datos
      await serviciosModel.modificarServicioById(obj, req.body.id);
      res.redirect('/admin/servicios');
    } catch (error) {
      console.log(error)
      res.render('admin/modificar', {
        layout: 'admin/layout',
        error: true,
        message: 'No se modifico los datos del profesional'
      })
    } //cierro catch
  })//cierro post

module.exports = router;