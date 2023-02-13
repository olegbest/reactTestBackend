import sequelize from '../db';
import { DataTypes } from 'sequelize';

const Files = sequelize.define('files', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  uuid: { type: DataTypes.STRING, unique: true },
  name: { type: DataTypes.STRING, allowNull: false },
  url: { type: DataTypes.STRING, allowNull: false, unique: true }
});

export default Files;
