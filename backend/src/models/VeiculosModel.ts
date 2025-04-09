import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { DATE } from 'sequelize';
import CategoriaModel from "./CategoriaModel";
import LocadoraModel from "./LocadorasModel";

class VeiculosModel extends Model {
    marca: string | undefined;
    modelo: string | undefined;
    ano: string | undefined;
    placa: string | undefined;
    preco_por_dia: number | undefined;
    imagem: string | undefined;
    locadora_id: number | undefined;
    categoria_id: number | undefined;
    alugado: boolean | undefined; 
}

VeiculosModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      marca: {
        type: DataTypes.STRING,
        allowNull: false, 
      },
      modelo: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
      ano: {
        type: DataTypes.INTEGER, 
        allowNull: false,
      },
      placa: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true,
      },
      preco_por_dia: {
        type: DataTypes.FLOAT //VERIFICAR
      },
      imagem: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
      locadora_id: {
        type: DataTypes.INTEGER,
        references: {
          model: LocadoraModel,
          key: "id",
        },
        allowNull: false,
      },
      categoria_id: {
        type: DataTypes.INTEGER,
        references: {
          model: CategoriaModel,
          key: "id",
        },
        allowNull: false,
      },
      alugado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize, 
      modelName: "VeiculosModel",
      tableName: "veiculos",
      timestamps: false,
    }
  );

//  Um Veículo pertence a UMA Locadora (N:1)
VeiculosModel.belongsTo(LocadoraModel, { foreignKey: "locadora_id", as: "locadora" });

//  Um Veículo pertence a UMA Categoria (N:1)
VeiculosModel.belongsTo(CategoriaModel, { foreignKey: "categoria_id", as: "categoria" });

export default VeiculosModel