import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class LocadorasModel extends Model {
    nome: string | undefined;
    cidade: string | undefined;
    estado: string | undefined;
};

//Definindo modelo das locações

LocadorasModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cidade: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
       sequelize,
       modelName: 'LocadorasModel',
       tableName: 'locadoras',
       timestamps: false
    }
);

export default LocadorasModel