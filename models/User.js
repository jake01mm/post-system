// 导出一个函数，该函数接受两个参数：sequelize 实例和 DataTypes 对象 // 导出模块
module.exports = (sequelize, DataTypes) => { // 定义一个名为 'User' 的模型，并返回这个模型 // 使用 sequelize.define 方法定义模型
  const User = sequelize.define('User', { // 定义 'username' 字段，类型为 STRING，不允许为空，并且必须唯一 // 设置 username 字段属性
    username: { // 设置字段类型为 STRING // 类型为 STRING
      type: DataTypes.STRING, // 设置字段不允许为空 // 不允许为空
      allowNull: false, // 设置字段值必须唯一 // 必须唯一
      unique: true, // 结束 username 字段定义
    }, // 定义 'email' 字段，类型为 STRING，不允许为空，并且必须唯一 // 设置 email 字段属性
    email: { // 设置字段类型为 STRING // 类型为 STRING
      type: DataTypes.STRING, // 设置字段不允许为空 // 不允许为空
      allowNull: false, // 设置字段值必须唯一 // 必须唯一
      unique: true, // 使用验证器确保字段值是一个有效的电子邮件地址 // 验证字段是否为有效电子邮件
      validate: { // 设置验证规则对象 // 验证规则对象
        isEmail: true, // 确保字段值符合电子邮件格式 // 验证是否为电子邮件
      }, // 结束 email 字段定义
    }, // 定义 'password' 字段，类型为 STRING，不允许为空 // 设置 password 字段属性
    password: { // 设置字段类型为 STRING // 类型为 STRING
      type: DataTypes.STRING, // 设置字段不允许为空 // 不允许为空
      allowNull: false, // 结束 password 字段定义
    }, // 结束 User 模型字段定义
  }); // 返回定义好的 User 模型 // 返回模型
  return User; // 结束模块导出函数
};






