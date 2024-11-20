const { Post } = require('../../models'); // 加载 Post 模型 // 加载模型
const { Op } = require('sequelize'); // 引入 Sequelize 操作符 // 引入操作符

// 创建帖子 // 定义创建帖子函数
exports.createPost = async (req, res) => { // 异步函数处理请求和响应 // 开始函数
  try { // 尝试执行以下代码块 // 尝试
    const { title, content } = req.body; // 从请求体中解构获取 title 和 content // 获取请求体数据
    const userId = req.user.id; // 从认证中间件提取用户 ID // 提取用户ID

    const post = await Post.create({ // 使用 Post 模型创建新帖子 // 创建帖子
      title, // 设置标题 // 标题
      content, // 设置内容 // 内容
      userId, // 设置用户ID // 用户ID
    });

    res.status(201).json({ // 发送成功响应 // 成功响应
      message: 'Post created successfully', // 响应消息 // 消息
      post, // 返回创建的帖子对象 // 帖子对象
    });
  } catch (error) { // 捕获异常 // 捕获错误
    console.error(error); // 在控制台打印错误信息 // 打印错误
    res.status(500).json({ error: 'Internal server error' }); // 发送服务器错误响应 // 错误响应
  }
}; // 结束 createPost 函数 // 结束函数

// 查看所有帖子，支持分页和搜索 // 定义获取所有帖子函数
exports.getAllPosts = async (req, res) => { // 异步函数处理请求和响应 // 开始函数
  try { // 尝试执行以下代码块 // 尝试
    const { page = 1, limit = 10, search = '' } = req.query; // 从查询参数中获取分页和搜索参数，默认第1页，每页10条数据 // 获取查询参数
    const offset = (page - 1) * limit; // 计算偏移量 // 计算偏移量

    // 查询数据库，支持分页和搜索 // 查询数据库
    const posts = await Post.findAndCountAll({ // 使用 findAndCountAll 方法查询并计数 // 查询方法
      where: { // 设置查询条件 // 查询条件
        [Op.or]: [ // 使用 OR 操作符 // OR 操作符
          { title: { [Op.like]: `%${search}%` } },   // 标题匹配关键字 // 标题匹配
          { content: { [Op.like]: `%${search}%` } }, // 内容匹配关键字 // 内容匹配
        ],
      },
      offset: parseInt(offset), // 设置偏移量 // 偏移量
      limit: parseInt(limit), // 设置限制数量 // 限制数量
      order: [['id', 'DESC']], // 按创建时间降序排列 // 排序
    });

    res.status(200).json({ // 发送成功响应 // 成功响应
      total: posts.count,          // 数据总条数 // 总条数
      totalPages: Math.ceil(posts.count / limit), // 总页数 // 总页数
      currentPage: parseInt(page), // 当前页码 // 当前页码
      posts: posts.rows,           // 当前页的数据 // 数据
    });
  } catch (error) { // 捕获异常 // 捕获错误
    console.error(error); // 在控制台打印错误信息 // 打印错误
    res.status(500).json({ error: 'Internal server error' }); // 发送服务器错误响应 // 错误响应
  }
}; // 结束 getAllPosts 函数 // 结束函数

// 查看单个帖子 // 定义获取单个帖子函数
exports.getPostById = async (req, res) => { // 异步函数处理请求和响应 // 开始函数
  try { // 尝试执行以下代码块 // 尝试
    const { id } = req.params; // 从请求参数中获取帖子ID // 获取ID

    const post = await Post.findByPk(id); // 使用 findByPk 方法查找帖子 // 查找帖子
    if (!post) { // 如果帖子不存在 // 判断是否存在
      return res.status(404).json({ error: 'Post not found' }); // 发送未找到响应 // 未找到响应
    }

    res.status(200).json({ post }); // 发送成功响应 // 成功响应
  } catch (error) { // 捕获异常 // 捕获错误
    console.error(error); // 在控制台打印错误信息 // 打印错误
    res.status(500).json({ error: 'Internal server error' }); // 发送服务器错误响应 // 错误响应
  }
}; // 结束 getPostById 函数 // 结束函数

// 修改帖子 // 定义更新帖子函数
exports.updatePost = async (req, res) => { // 异步函数处理请求和响应 // 开始函数
  try { // 尝试执行以下代码块 // 尝试
    const { id } = req.params; // 从请求参数中获取帖子ID // 获取ID
    const { title, content } = req.body; // 从请求体中解构获取 title 和 content // 获取请求体数据
    const userId = req.user.id; // 从认证中间件提取用户 ID // 提取用户ID

    const post = await Post.findOne({ where: { id, userId } }); // 使用 findOne 方法查找帖子 // 查找帖子
    if (!post) { // 如果帖子不存在或无权限 // 判断是否存在或授权
      return res.status(404).json({ error: 'Post not found or not authorized' }); // 发送未找到或无权限响应 // 未找到或无权限响应
    }

    post.title = title || post.title; // 更新标题 // 更新标题
    post.content = content || post.content; // 更新内容 // 更新内容
    await post.save(); // 保存更新后的帖子 // 保存帖子

    res.status(200).json({ // 发送成功响应 // 成功响应
      message: 'Post updated successfully', // 响应消息 // 消息
      post, // 返回更新后的帖子对象 // 帖子对象
    });
  } catch (error) { // 捕获异常 // 捕获错误
    console.error(error); // 在控制台打印错误信息 // 打印错误
    res.status(500).json({ error: 'Internal server error' }); // 发送服务器错误响应 // 错误响应
  }
}; // 结束 updatePost 函数 // 结束函数

// 删除帖子 // 定义删除帖子函数
exports.deletePost = async (req, res) => { // 异步函数处理请求和响应 // 开始函数
  try { // 尝试执行以下代码块 // 尝试
    const { id } = req.params; // 从请求参数中获取帖子ID // 获取ID
    const userId = req.user.id; // 从认证中间件提取用户 ID // 提取用户ID

    const post = await Post.findOne({ where: { id, userId } }); // 使用 findOne 方法查找帖子 // 查找帖子
    if (!post) { // 如果帖子不存在或无权限 // 判断是否存在或授权
      return res.status(404).json({ error: 'Post not found or not authorized' }); // 发送未找到或无权限响应 // 未找到或无权限响应
    }

    await post.destroy(); // 删除帖子 // 删除帖子
    res.status(200).json({ message: 'Post deleted successfully' }); // 发送成功响应 // 成功响应
  } catch (error) { // 捕获异常 // 捕获错误
    console.error(error); // 在控制台打印错误信息 // 打印错误
    res.status(500).json({ error: 'Internal server error' }); // 发送服务器错误响应 // 错误响应
  }
}; // 结束 deletePost 函数 // 结束函数






