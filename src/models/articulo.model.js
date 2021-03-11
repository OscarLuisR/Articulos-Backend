const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
    const Articulo = sequelize.define('articulos', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: 'Marca can not be null'
                }
            }
        },
        departamento: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Marca can not be null'
                }
            }
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Modelo can not be null'
                }
            }
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Stock can not be null'
                }
            }
        }
    }, {
        timestamps: true,
    });

    sequelizePaginate.paginate(Articulo);

    return Articulo;
};