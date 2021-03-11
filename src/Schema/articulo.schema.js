const joi = require('joi');
const message = require('../lib/message');

const articuloSchema = {};

articuloSchema.validaSchema = joi.object({
    descripcion: joi.string()
        .trim()
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":  
                        err.message = "Debe ingresar una Descripcion";
                        break;
                    case "string.empty":
                        err.message = "Debe ingresar una Descripcion Valida";                                             
                        break;
                    default:
                        break;
                }
            });

            return errors;
        }),

    departamento: joi.string()
        .trim()
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":  
                        err.message = "Debe ingresar un Departamento";
                        break;
                    case "string.empty":
                        err.message = "Debe ingresar un Departamento Valida";                                             
                        break;
                    default:
                        break;
                }
            });

            return errors;
        }),

    precio: joi.number()
        .integer()
        .min(0)
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":  
                        err.message = "Debe ingresar un Precio";
                        break;
                    case "string.empty":
                        err.message = "Debe ingresar un Precio Valido";                                             
                        break;
                    case "number.base":
                        err.message = "El Precio debe ser un numero Entero Valido";                                             
                        break;
                    case "number.min":
                        err.message = "El Precio debe tener valores Positivos";                        
                        break;
                    default:
                        break;
                }
            });

            return errors;
        }),

    stock: joi.number()
        .integer()
        .min(0)
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":  
                        err.message = "Debe ingresar un Stock";
                        break;
                    case "string.empty":
                        err.message = "Debe ingresar un Stock Valido";                                             
                        break;
                    case "number.base":
                        err.message = "El Stock debe ser un numero Entero Valido";                                             
                        break;
                    case "number.min":
                        err.message = "El Stock debe tener valores Positivos";                        
                        break;
                    default:
                        break;
                }
            });

            return errors;
        })
});

module.exports = articuloSchema;
