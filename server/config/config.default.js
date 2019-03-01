/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1550732548919_1009';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: []
  };

  // 重置 Session 的有效期
  config.session = {
    key: 'coding',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
    renew: true
  };

  // 允许跨域携带cookie
  config.cors = {
    credentials: true,
    origin:'http://localhost:3000',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  },

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: 'Coding123',
    port: 3306,
    database: 'api-mock',
  };

  return {
    ...config,
    ...userConfig,
  };
};
