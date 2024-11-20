// 导出一个函数，该函数接收两个参数：sequelize（数据库连接实例）和DataTypes（定义字段的数据类型）
module.exports = (sequelize, DataTypes) => {
  // 使用sequelize定义一个名为Post的模型
  const Post = sequelize.define('Post', {
      // 定义模型的属性title，类型为字符串，不允许为空
      title: {
          type: DataTypes.STRING, // 数据类型为字符串
          allowNull: false,       // 不允许为空
      },
      // 定义模型的属性content，类型为文本，不允许为空
      content: {
          type: DataTypes.TEXT,   // 数据类型为文本
          allowNull: false,       // 不允许为空
      },
      // 定义模型的属性userId，类型为整数，不允许为空
      userId: {
          type: DataTypes.INTEGER,// 数据类型为整数
          allowNull: false,       // 不允许为空
      },
  });

  // 定义模型之间的关联关系
  Post.associate = (models) => {
      // Post属于User模型，通过userId字段建立外键关联，并指定别名'author'
      Post.belongsTo(models.User, { foreignKey: 'userId', as: 'author' });
  };

  // 返回定义好的Post模型
  return Post;
};