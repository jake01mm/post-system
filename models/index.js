'use strict'; // 启用严格模式

const fs = require('fs'); // 引入文件系统模块
const path = require('path'); // 引入路径模块
const Sequelize = require('sequelize'); // 引入Sequelize库
const basename = path.basename(__filename); // 获取当前文件的文件名
const env = process.env.NODE_ENV || 'development'; // 获取环境变量或默认值'development'
const config = require('../config/config.js')[env]; // 根据环境变量获取配置
const db = {}; // 初始化数据库对象

let sequelize; // 声明sequelize变量
if (config.use_env_variable) { // 如果配置中使用环境变量
  sequelize = new Sequelize(process.env[config.use_env_variable], config); // 使用环境变量初始化Sequelize
} else { // 否则
  sequelize = new Sequelize(config.database, config.username, config.password, config); // 使用配置文件中的信息初始化Sequelize
}

fs.readdirSync(__dirname) // 同步读取当前目录下的文件
  .filter(file => { // 过滤文件
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'; // 排除以'.'开头的文件、当前文件和非'.js'文件
  })
  .forEach(file => { // 对每个文件
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes); // 引入文件并初始化模型
    db[model.name] = model; // 将模型添加到数据库对象中
  });

Object.keys(db).forEach(modelName => { // 遍历数据库对象中的每个模型
  if (db[modelName].associate) { // 如果模型有associate方法
    db[modelName].associate(db); // 调用associate方法
  }
});

db.sequelize = sequelize; // 将sequelize实例添加到数据库对象中
db.Sequelize = Sequelize; // 将Sequelize库添加到数据库对象中

module.exports = db; // 导出数据库对象