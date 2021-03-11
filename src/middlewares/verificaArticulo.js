const { articuloModel } = require('../db/database');
const articuloSchema = require('../Schema/articulo.schema');

const verificaArticulo = {};

verificaArticulo.verificaParametrosPaginacion = async (req, res, next) => {
    // let limit = req.query.limit;
    let page = req.query.page;
    let paginationMin = req.query.paginationMin;
    let paginationMax = req.query.paginationMax;
    
    try {
        // SE VERIFICA SI SE INGRESO EL PARAMETRO LIMIT (CANTIDAD DE REGISTROS POR PAGINA)
        /* if (limit !== undefined) {
            // SE VERIFICA SI EL PARAMETRO LIMIT ES UN NUMERO VALIDO
            if (isNaN(limit) || limit.length <= 0 ) {
                return res.json({ status: 400, error: true, message: 'El parametro Limit debe ser un numero valido', results: "" });
            }

            // SE VERIFICA SI EL PARAMETRO LIMIT ES UN NUMERO ENTERO MAYOR A CERO
            if (parseInt(limit) <= 0) {
                return res.json({ status: 400, error: true, message: 'El parametro Limit debe ser un numero entero mayor a Cero', results: "" });
            }
        }else {
            // SE COLOCA VALOR POR DEFECTO AL PARAMETRO LIMIT
            limit = 10;
        } */
        
        // SE VERIFICA SI SE INGRESO EL PARAMETRO PAGE (PAGINA ACTUAL)
        if (page !== undefined) {
            // SE VERIFICA SI EL PARAMETRO PAGE ES UN NUMERO VALIDO
            if (isNaN(page) || page.length <= 0 ) {
                return res.json({ status: 400, error: true, message: 'El parametro Page debe ser un numero valido', results: "" });
            }

            // SE VERIFICA SI EL PARAMETRO PAGE ES UN NUMERO ENTERO MAYOR A CERO
            if (parseInt(page) <= 0) {
                return res.json({ status: 400, error: true, message: 'El parametro Page debe ser un numero entero mayor a Cero', results: "" });
            }
        }else {
            // SE COLOCA VALOR POR DEFECTO AL PARAMETRO PAGE
            page = 1;
        }

        // SE VERIFICA SI SE INGRESO EL PARAMETRO PAGINATION MIN (VALOR MINIMO DEL ARRAY DE PAGINACION)
        if (paginationMin !== undefined) {
            // SE VERIFICA SI EL PARAMETRO PAGINATION MIN ES UN NUMERO VALIDO
            if (isNaN(paginationMin) || paginationMin.length <= 0 ) {
                return res.json({ status: 400, error: true, message: 'El parametro Pagination Min debe ser un numero valido', results: "" });
            }

            // SE VERIFICA SI EL PARAMETRO PAGINATION MIN ES UN NUMERO ENTERO MAYOR A CERO
            if (parseInt(paginationMin) <= 0) {
                return res.json({ status: 400, error: true, message: 'El parametro Pagination Min debe ser un numero entero mayor a Cero', results: "" });
            }
        }else {
            // SE COLOCA VALOR POR DEFECTO AL PARAMETRO PAGINATION MIN
            paginationMin = 0;
        }

        // SE VERIFICA SI SE INGRESO EL PARAMETRO PAGINATION MAX (VALOR MAXIMO DEL ARRAY DE PAGINACION)
        if (paginationMax !== undefined) {
            // SE VERIFICA SI EL PARAMETRO PAGINATION MAX ES UN NUMERO VALIDO
            if (isNaN(paginationMax) || paginationMax.length <= 0 ) {
                return res.json({ status: 400, error: true, message: 'El parametro Pagination Max debe ser un numero valido', results: "" });
            }

            // SE VERIFICA SI EL PARAMETRO PAGINATION MAX ES UN NUMERO ENTERO MAYOR A CERO
            if (parseInt(paginationMax) <= 0) {
                return res.json({ status: 400, error: true, message: 'El parametro Pagination Max debe ser un numero entero mayor a Cero', results: "" });
            }
        }else {
            // SE COLOCA VALOR POR DEFECTO AL PARAMETRO PAGINATION MAX
            paginationMax = 0;
        }

        // SE VERIFICA QUE EL PARAMETRO PAGINATION MIN NO SEA MAYOR AL PARAMETRO PAGINATION MAX
        if (parseInt(paginationMin) > parseInt(paginationMax)) {
            return res.json({ status: 400, error: true, message: 'El parametro Pagination Min no puede ser mayor al parametro Pagination Max', results: "" });
        }

        // SE AGREGRAN LOS PARAMETROS COMO PROPIEDADES
        // req.query.limit = limit;
        req.query.page = page;
        req.query.paginationMin = paginationMin;
        req.query.paginationMax = paginationMax;
        
        next();

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

verificaArticulo.verificaDatosRegistroArticulo = async (req, res, next) => {
    const { descripcion } = req.body;

    try {
        const { error } = await articuloSchema.validaSchema.validate(req.body);

        if (error) {
            return res.json({ status: 400, error: true, message: error.details[0].message, results: "" });
        }

        // VERIFICAR SI LA DESCRIPCION YA EXISTEN EN LA BD
        const descripcionFind = await articuloModel.findOne({ where: { descripcion : descripcion } });

        if (descripcionFind) {
            return res.json({ status: 400, error: true, message: 'La Descripcion Ya Existe', results: "" });
        }

        next();

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

verificaArticulo.verificaDatosUpdateArticulo = async (req, res, next) => {
    const { descripcion, departamento, precio, stock } = req.body;
    const { id } = req.params;
    
    try {
        const { error } = await articuloSchema.validaSchema.validate(req.body);

        if (error) {
            // VERIFICAR QUE CAMPOS SE INGRESARON PARA COMPROBAR SI YA EXISTEN EN LA BD
            if ((descripcion !== undefined && error.details[0].context.key == 'descripcion') ||
                (departamento !== undefined && error.details[0].context.key == 'departamento') ||
                (precio !== undefined && error.details[0].context.key == 'precio') ||
                (stock !== undefined && error.details[0].context.key == 'stock')) {
                return res.json({ status: 400, error: true, message: error.details[0].message, results: "" });
            }
        }

        // VERIFICAR SI SE INGRESO UNA DESCRIPCION
        if (descripcion !== undefined) {
            const descripcionFind = await articuloModel.findOne({ where: { descripcion : descripcion } });

            if (descripcionFind) {
                if (id != descripcionFind.id) {
                    return res.json({ status: 400, error: true, message: 'La Descripcion Ya Existe', results: "" });
                }
            }
        }

        next();

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }   
};

module.exports = verificaArticulo;