import { error } from "console";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("aluga_ai", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
