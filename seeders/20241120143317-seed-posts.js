'use strict'; // 使用严格模式 // 严格模式

module.exports = { // 导出模块对象 // 导出模块
  async up(queryInterface, Sequelize) { // 定义 up 函数，用于执行迁移操作 // 异步 up 函数
    const posts = []; // 初始化一个空数组来存储帖子数据 // 帖子数组
    for (let i = 1; i <= 50; i++) { // 循环生成 50 个帖子 // 开始循环
      posts.push({ // 将每个帖子对象推入数组 // 推入帖子
        title: `Post ${i}`, // 设置帖子标题 // 标题
        content: `This is the content of post ${i}.`, // 设置帖子内容 // 内容
        userId: i % 2 === 0 ? 1 : 2, // 偶数关联到 user1，奇数关联到 user2 // 用户ID
        createdAt: new Date(), // 设置创建时间为当前时间 // 创建时间
        updatedAt: new Date(), // 设置更新时间为当前时间 // 更新时间
      }); // 结束帖子对象定义
    } // 结束循环

    await queryInterface.bulkInsert('Posts', posts, {}); // 批量插入帖子数据到 Posts 表 // 批量插入
  }, // 结束 up 函数定义

  async down(queryInterface, Sequelize) { // 定义 down 函数，用于回滚迁移操作 // 异步 down 函数
    await queryInterface.bulkDelete('Posts', null, {}); // 删除 Posts 表中的所有记录 // 批量删除
  }, // 结束 down 函数定义
}; // 结束模块导出对象






