var express = require('express');
var router = express.Router();
var serviciosModel = require('../../models/serviciosModel');
var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);


//GET listar servicios page//
router.get('/', async function (req, res, next) {

    var servicios = await serviciosModel.getServicios();

    servicios = servicios.map(servicio => {
        if (servicio.img_id) {
            const imagen = cloudinary.image(servicio.img_id, {
                width: 50,
                height: 50,
                crop: 'fill'
            });
            return {
                ...servicio,//usuarios, cargo e info
                imagen//img
            }
        } else {
            return {
                ...servicio,//usuarios, cargo e info
                imagen: ''//nada
            }
        }
    })

    res.render('admin/servicios', {
        layout: 'admin/layout',
        persona: req.session.nombre,
        servicios
    });
});

//para eliminar una novedad//
router.get('/eliminar/:id', async (req, res, next) => {
    const id = req.params.id;//2

    let servicio = await serviciosModel.getServicioById(id);
    if (servicio.img_id) {
        await (destroy(servicio.img_id));
    }

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
        var img_id = '';
        if (req.files && Object.keys(req.files).length > 0) {
            imagen = req.files.imagen;
            img_id = (await uploader(imagen.tempFilePath)).public_id;
        }
        // console.log(req.body)
        if (req.body.usuarios != "" && req.body.cargo != "" && req.body.info != "") {
            await serviciosModel.insertServicio({
                ...req.body, //spread users, cargo e info
                img_id
            });
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
            message: 'No se cargo el profesional'
        })
    }
})


//diseño de modificar mas traer servicio que seleccione//

router.get('/modificar/:id', async (req, res, next) => {
    var id = req.params.id;
    var servicio = await serviciosModel.getServicioById(id);
    res.render('admin/modificar', {
        layout: 'admin/layout',
        servicio
    });
}); //cierro get modi//


//ACTUALIZAR LA NOVEDAD//
router.post('/modificar', async (req, res, next) => {
    try {
        //borrar en modificar
        let img_id = req.body.img_original;
        let borrar_img_vieja = false;

        if (req.body.img_delete === "1") {
            img_id = null;
            borrar_img_vieja = true;
        } else {
            if (req.files && Object.keys(req.files).length > 0) {
                imagen = req.files.imagen;
                img_id = (await uploader(imagen.tempFilePath)).public_id;
                borrar_img_vieja = true;
            }
        }
        if (borrar_img_vieja && req.body.img_original) {
            await (destroy(req.body.img_original));
        } //fin de borrar en modi
        //console.log(req.body.id); //para ver el id
        var obj = {
            usuarios: req.body.usuarios,
            cargo: req.body.cargo,
            info: req.body.info,
            img_id
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