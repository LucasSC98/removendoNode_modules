import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import UsuarioModel from "./UsuarioModel";
import VeiculosModel from "./VeiculosModel";

class AluguelModel extends Model {
  usuario_id!: number;
  veiculo_id!: number;
  data_inicio!: Date;
  data_fim!: Date;
  valor_total!: number;
}

AluguelModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    alugado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UsuarioModel,
        key: "id",
      },
    },
    veiculo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: VeiculosModel,
        key: "id",
      },
    },
    data_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    data_fim: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    valor_total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "AluguelModel",
    tableName: "aluguéis",
    timestamps: false,
  }
);

// Relacionamentos
AluguelModel.belongsTo(UsuarioModel, { foreignKey: "usuario_id", as: "usuario" });
AluguelModel.belongsTo(VeiculosModel, { foreignKey: "veiculo_id", as: "veiculo" });

export default AluguelModel;
