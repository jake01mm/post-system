const app = require('./src/app'); // 引入 express 应用实例 // 引入应用
const dotenv = require('dotenv'); // 引入 dotenv 模块用于环境变量管理 // 引入 dotenv
const db = require('./models'); // 引入 Sequelize 实例 // 引入模型

dotenv.config(); // 加载 .env 文件中的环境变量 // 加载环境变量

const PORT = process.env.PORT || 3000; // 设置端口号，默认为 3000 // 设置端口

// 未捕获异常处理 // 处理未捕获异常
process.on('uncaughtException', (err) => { // 监听 uncaughtException 事件 // 监听事件
  console.error('There was an uncaught error:', err); // 打印错误信息 // 打印错误
  process.exit(1); // 退出进程 // 退出进程
});

// 测试数据库连接 // 测试数据库连接
db.sequelize
  .authenticate() // 使用 authenticate 方法测试数据库连接 // 测试连接
  .then(() => {
    console.log('Database connected successfully!'); // 数据库连接成功日志 // 成功日志

    // 启动服务 // 启动服务器
    app.listen(PORT, () => { // 使用 listen 方法启动服务器并监听指定端口 // 监听端口
      console.log(`Server is running on http://localhost:${PORT}`); // 打印服务器运行信息 // 运行信息
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err); // 打印数据库连接失败信息 // 失败信息
    process.exit(1); // 数据库连接失败时退出程序 // 退出进程
  });






