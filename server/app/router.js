'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const { user } = controller;

  router.get('/auth', user.auth); // 用户授权
  router.post('/signin', user.signin); // 登录
  router.post('/signup', user.signup); //注册
  router.all('/signout', user.signout); // 登出

};
