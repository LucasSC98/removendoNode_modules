import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';  // Importando a conexão com o banco
import bcrypt from 'bcrypt'

class UsuarioModel extends Model {
  id: number | undefined;
  nome: string | undefined;
  email: string | undefined;
  senha: string | undefined;
  tipo: 'admin' | 'cliente' | undefined;
  cpf: string | undefined;

  //função para Criptografar a senha
  public async hashSenha() {
    this.senha = await bcrypt.hash(this.senha!, 10)
  }

  //função para validar a senha, se é diferente
  public async validaSenha(senha: string): Promise<boolean>{
    return await bcrypt.compare(senha, this.senha!)
  }
}

// Definindo o modelo de usuário
UsuarioModel.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,  
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.ENUM('admin', 'cliente'),
      defaultValue: 'cliente',  // Valor padrão como 'cliente'
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
  },
  {
    sequelize,  // Passando a instância do sequelize
    modelName: 'UsuarioModel',  // Nome do modelo
    tableName: 'usuarios',  // Nome da tabela no banco de dados
    timestamps: false
  }
);

//Após criar um usuário, chamar a função para criptrografar 
UsuarioModel.beforeCreate(async (usuario: UsuarioModel) => {
  await usuario.hashSenha()
})

//Após atualizar um usuário, chamar a função para criptrografar 
UsuarioModel.beforeUpdate(async (usuario: UsuarioModel) => {
  if(usuario.changed('senha')){
    await usuario.hashSenha()
  }
})

export default UsuarioModel;
