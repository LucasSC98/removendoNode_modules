import { Model, DataTypes} from 'sequelize'; 
import sequelize from "../config/database";


class CategoriaModel extends Model {
  nome: string | undefined;
};

CategoriaModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
      },
    },
    {
      sequelize, 
      modelName: "CategoriaModel",
      tableName: "categorias",
      timestamps: false,
    }
  );

export default CategoriaModel;