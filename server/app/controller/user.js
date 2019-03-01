'use strict';

const validator = require('validator');
const ms = require('ms');
const BaseController = require('./base');

class UserController extends BaseController {

  async auth() {
    const { service } = this;
    if (service.session.get('user')) {
      const data = {
        username: service.session.get('user'),
        msg: '用户已登录'
      }
      this.success(data);
    } else {
      this.error({msg: '用户未登录'}, 401);
    }
  }

  /*
   * 注册
   */
  async signup() {
    const { ctx, service } = this;
    const name = validator.trim(ctx.request.body.username || '');
    const email = validator.trim(ctx.request.body.email || '');
    const pass = validator.trim(ctx.request.body.password || '');
    const rePass = validator.trim(ctx.request.body.confirm || '');

    let msg;
    // 验证信息的正确性
    if ([ name, pass, rePass, email ].some(item => {
      return item === '';
    })) {
      msg = '信息不完整。';
    } else if (name.length < 2) {
      msg = '用户名至少需要2个字符。';
    } else if (!ctx.helper.validateId(name)) {
      msg = '用户名不合法。';
    } else if (!validator.isEmail(email)) {
      msg = '邮箱不合法。';
    } else if (pass !== rePass) {
      msg = '两次密码输入不一致。';
    }
    // END 验证信息的正确性

    if (msg) {
      this.error({msg: msg}, 422);
      return;
    }

    const sameNameUser = await service.user.getUserByName(name);
    if(sameNameUser) {
      msg = '用户名已被使用';
      this.error({msg: msg}, 422);
      return;
    }

    const sameEmailUser = await service.user.getUserByMail(email);
    if(sameEmailUser) {
      msg = '邮箱已被注册';
      this.error({msg: msg}, 422);
      return;
    }

    const passhash = ctx.helper.bhash(pass);
    await service.user.createUser({name, email, passhash});
    this.success({msg: '注册成功'});
  }

  /*
   * 登录
   */
  async signin() {
    const { ctx, service } = this;
    const username = ctx.request.body.username;
    const password = ctx.request.body.password;
    const remember = ctx.request.body.remember;
    
    const getUser = username => {
      if (username.indexOf('@') > 0) {
        return ctx.service.user.getUserByMail(username);
      }
      return ctx.service.user.getUserByName(username);
    };
    const existUser = await getUser(username);

    let msg;
    // 用户不存在
    if (!existUser) {
      msg = '用户不存在';
      this.error({msg: msg}, 401);
      return;
    }

    const passhash = existUser.pass;
    // TODO: change to async compare
    const equal = ctx.helper.bcompare(password, passhash);
    // 密码不匹配
    if (!equal) {
      msg = '密码输入错误';
      this.error({msg: msg}, 401);
      return;
    }

    
    if (remember) {
      service.session.set('user', existUser.name, ms('30d'));
    } else {
      service.session.set('user', existUser.name);
    }

    const data = {
      username: existUser.name,
      email: existUser.email,
      msg: '登录成功'
    }
    
    this.success(data);
  }

  /*
   * 注销
   */
  async signout() {
    const { service } = this;
    service.session.destroy();

    const msg = '已退出登录';
    this.success({msg: msg});
  }
}

module.exports = UserController;