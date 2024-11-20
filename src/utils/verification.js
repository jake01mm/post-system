const { VerificationCode } = require('../../models'); // 路径调整为从项目根目录向上两级
const crypto = require('crypto');
const { Op } = require('sequelize');

class Verification {
  static generateCode() {
    return crypto.randomInt(100000, 999999).toString(); // 生成6位随机验证码
  }

  static async create(userId, context, duration = 10) {
    const code = this.generateCode();
    const expiresAt = new Date(Date.now() + duration * 60 * 1000); // 有效期（分钟）

    await VerificationCode.create({ userId, code, context, expiresAt });

    return code; // 返回生成的验证码
  }

  static async validate(userId, code, context) {
    const verification = await VerificationCode.findOne({
      where: {
        userId,
        code,
        context,
        expiresAt: { [Op.gt]: new Date() }, // 确保验证码未过期
      },
    });

    if (!verification) {
      return false; // 验证失败
    }

    // 验证成功后删除记录
    await verification.destroy();
    return true;
  }
}

module.exports = Verification;
