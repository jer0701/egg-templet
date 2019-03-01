
'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
    success(data, code = 200) {
        const { ctx } = this;
        ctx.body = JSON.stringify({
            code: code,
            data: data
        });
    }

    error(data, code = 500) {
        const { ctx } = this;
        ctx.body = JSON.stringify({
            code: code,
            data: data
        });
    }

    notFound(data) {
        const { ctx } = this;
        ctx.body = JSON.stringify({
            code: 404,
            data: data
        });
    }
}

module.exports = BaseController;