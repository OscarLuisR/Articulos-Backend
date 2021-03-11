const router = require('express').Router();
const articuloCtrl = require('../controllers/articulo.controller');
const { verificaToken, verificaPermisoUser, verificaParametrosPaginacion, verificaDatosRegistroArticulo, verificaDatosUpdateArticulo } = require('../middlewares/index');

router.get('/', [verificaToken, verificaPermisoUser, verificaParametrosPaginacion], articuloCtrl.getArticulos);
router.get('/:id', [verificaToken, verificaPermisoUser], articuloCtrl.getArticuloId);
router.post('/', [verificaToken, verificaPermisoUser, verificaDatosRegistroArticulo], articuloCtrl.createArticulo);
router.put('/:id', [verificaToken, verificaPermisoUser, verificaDatosUpdateArticulo], articuloCtrl.updateArticulo);
router.delete('/:id', [verificaToken, verificaPermisoUser], articuloCtrl.deleteArticulo);

module.exports = router;