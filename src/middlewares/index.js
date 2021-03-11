const { verificaDatosLogin, verificaToken, verificaPermisoAdmin, verificaPermisoUser, verificaPermisoGuest } = require('./verificaAuth');
const { verificaDatosRegistroArticulo, verificaDatosUpdateArticulo, verificaParametrosPaginacion } = require('./verificaArticulo');

module.exports = {
    verificaDatosLogin,
    verificaToken,
    verificaPermisoAdmin, 
    verificaPermisoUser,
    verificaPermisoGuest,
    verificaDatosRegistroArticulo, 
    verificaDatosUpdateArticulo,
    verificaParametrosPaginacion
};