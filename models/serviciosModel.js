var pool = require ('./bd');

//sirve para listar los servicios//
async function getServicios(){
        var query = 'select * from servicios';
        var rows = await pool.query(query);
        return rows;
}
//ELIMIAR
async function deleteServiciosById(id) {
        var query = 'delete from servicios where id = ?';
        var rows = await pool.query(query, [id]);
        return rows;
}

//INSERTAR
async function insertServicio(obj) {
    try {
        var query = "insert into servicios set ? ";
        var rows = await pool.query(query, [obj]);
        return rows;
    
    } catch (error) {
        console.log(error);
        throw error;
    }//cierra catch
}//cierra insert

//datos para modificar un profesional
async function getServicioById(id) {
    var query = "select * from servicios where id=? ";
    var rows = await pool.query(query, [id]);
    return rows[0];
}

//MODI UPDATE
async function modificarServicioById(obj, id) {
    try {
        var query = "update servicios set ? where id=?";
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        throw error;
    }
}//cierra modi update

async function buscarServicios(busqueda) {
    var query = "select * from servicios where usuarios like ? OR cargo like ? OR info like ?"; 
    var rows = await pool.query(query, ['%' + busqueda + '%', '%' + busqueda + '%', '%' + busqueda + '%']);
    return rows;
}
    


module.exports = { getServicios, deleteServiciosById, insertServicio, getServicioById, modificarServicioById, buscarServicios}
