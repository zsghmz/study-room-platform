const Base = require('./base.js');

module.exports = class extends Base {
  async __before() {
    // const userInfo = await this.session('userInfo');
    // 获取用户的 session 信息，如果为空，返回 false 阻止后续的行为继续执行
    const userInfo = await this.session('userInfo');
    if (think.isEmpty(userInfo)) { // 为空返回失败告知没有登录
      // const cont = this.controller('user');
      // cont.assign('msg', '尊敬的用户，请先登录！');
      // this.assign('msg', '尊敬的用户，请先登录！');
      // return this.locale("<script>alert('请先登录');</script>");
      return this.redirect('../user');
    }
    this.userInfo = userInfo;
    this.assign('userInfo', userInfo);
  }
  async logoutAction() {
    /* this.session().then(function() {}); */
    await this.session(null);
    // await this.cookie('userInfo', null);
    return this.redirect('../user');
  }
  async judgeAction() {
    const userInfo = await this.session('userInfo');
    const name = userInfo.userName;
    if (name === 'admin') {
      return this.redirect('../admin');
    } else {
      // this.assign('msg', '尊敬的用户，您没有管理员权限');
      return this.display('apply_index');
    }
  }
  indexAction() {
    return this.display();
  }
};
