'use strict';

const Service = require('egg').Service;

class SessionService extends Service {
   
    get (key) {
      const { ctx } = this;
      return ctx.session[key];
    }

    set (key, value, maxAge) {
      const { ctx } = this;
      ctx.session[key] = value;
      ctx.session.maxAge = maxAge ? maxAge : 24 * 3600 * 1000;
    }

    destroy () {
      const { ctx } = this;
      ctx.session = null;
    }
}

module.exports = SessionService;