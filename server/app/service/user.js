'use strict';

const Service = require('egg').Service;

class UserService extends Service { 
  /*
   * 根据用户邮件查找用户
   */
  async getUserByMail(email) {
    return await this.ctx.model.User.findByMail(email);
  }

  /*
   * 根据用户名查找用户
   */
  async getUserByName(name) {
    return await this.ctx.model.User.findByName(name);
  }

  /*
   * 根据用户id查找用户
   */
  async getUserById(id) {
    return await this.ctx.model.User.findById(id);
  }

  /*
   * 创建新用户
   */
  async createUser(user) {
    const newUser = {
      email: user.email,
      name: user.name,
      pass: user.passhash
    }
    return this.ctx.model.User.create(newUser);
  }

  /*
   * 更新用户信息
   */
  async updateUser({ id, updates }) {
    const user = await this.ctx.model.User.findById(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user.update(updates);
  }

  /*
   * 删除用户
   */
  async deleteUser(id) {
    const user = await this.ctx.model.User.findById(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user.destroy();
  }
}

module.exports = UserService;