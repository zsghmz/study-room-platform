const Base = require('./base.js');
const pagination = require('think-pagination');

module.exports = class extends Base {
  async indexAction() {
    const model = this.model('user');
    const result = await model.where({userName: 'admin'}).find();
    // var num = Number(await model.count());
    const data = await model.page(this.get('page'), 3).countSelect();
    // this.assign('data', data);
    // const result = await model.where({userName: 'admin'}).find();
    // const num = Number(await model.query('select MAX(id) from think_user'));
    // const num = Number(data.id);
    // const data = await model.page(this.get('page'), 10).order('id desc').countSelect();
    // // const usersInfo = await model.select();
    const html = pagination(data, this.ctx, {
      desc: false,
      pageNum: 2,
      url: '',
      class: 'nomargin',
      text: {
        next: '下一页',
        prev: '上一页',
        total: 'count: $ {count}, page: $ {pages}'
      }
    });
    this.assign('pagination', html);
    this.assign({
      'org_name': result.organization,
      'title': '这是一个新的控制器',
      'data': data.data
    });
    // this.success(data.data);
    // this.assign('usersInfo', usersInfo);
    return this.display();
  }
  async selectAction() {
    const model = this.model('user');
    const data = await model.where({userName: this.post('uname'), name: this.post('name'), userPhone: this.post('phone')}).select();
    // this.require('../admin');
    this.assign('data', data);
    this.success();
    this.display('admin_index');
  }
};
