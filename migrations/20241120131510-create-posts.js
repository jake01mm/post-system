'use strict'; // 使用严格模式 // 严格模式

module.exports = { // 导出模块对象 // 导出模块
  async up(queryInterface, Sequelize) { // 定义 up 函数，用于执行迁移操作 // 异步 up 函数
    await queryInterface.createTable('Posts', { // 使用 createTable 方法创建 Posts 表 // 创建表
      id: { // 定义 id 字段 // id 字段
        allowNull: false, // 设置字段不允许为空 // 不允许为空
        autoIncrement: true, // 设置字段自动递增 // 自动递增
        primaryKey: true, // 设置字段为主键 // 主键
        type: Sequelize.INTEGER, // 设置字段类型为 INTEGER // 类型
      },
      title: { // 定义 title 字段 // title 字段
        type: Sequelize.STRING, // 设置字段类型为 STRING // 类型
        allowNull: false, // 设置字段不允许为空 // 不允许为空
      },
      content: { // 定义 content 字段 // content 字段
        type: Sequelize.TEXT, // 设置字段类型为 TEXT // 类型
        allowNull: false, // 设置字段不允许为空 // 不允许为空
      },
      userId: { // 定义 userId 字段 // userId 字段
        type: Sequelize.INTEGER, // 设置字段类型为 INTEGER // 类型
        allowNull: false, // 设置字段不允许为空 // 不允许为空
        references: { // 设置外键约束 // 外键约束
          model: 'Users', // 关联到 Users 表 // 关联模型
          key: 'id', // 关联到 Users 表的 id 字段 // 关联字段
        },
      },
      createdAt: { // 定义 createdAt 字段 // createdAt 字段
        allowNull: false, // 设置字段不允许为空 // 不允许为空
        type: Sequelize.DATE, // 设置字段类型为 DATE // 类型
      },
      updatedAt: { // 定义 updatedAt 字段 // updatedAt 字段
        allowNull: false, // 设置字段不允许为空 // 不允许为空
        type: Sequelize.DATE, // 设置字段类型为 DATE // 类型
      },
    });
  }, // 结束 up 函数定义 // 结束函数

  async down(queryInterface, Sequelize) { // 定义 down 函数，用于回滚迁移操作 // 异步 down 函数
    await queryInterface.dropTable('Posts'); // 使用 dropTable 方法删除 Posts 表 // 删除表
  }, // 结束 down 函数定义 // 结束函数
}; // 结束模块导出对象 // 结束模块






